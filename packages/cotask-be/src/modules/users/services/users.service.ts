/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IUsersService } from './users.abstract';
import { User } from '../entities/user.entity';
import { USER_REPO } from '@cotask-be/common/constans/table-repos';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService extends IUsersService {
  constructor(@Inject(USER_REPO) protected userRepository: Repository<User>) {
    super();
  }

  getByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        email,
      },
    });
  }
  async create(
    username: string,
    email: string,
    password: string,
    avatarUrl: string
  ): Promise<User> {
    const user = await this.getByEmail(email);
    if (user) {
      throw new BadRequestException('Email is already registered');
    }
    // TODO password hash
    const passwordHash = await bcrypt.hash(password, 10);
    const partial = this.userRepository.create({
      username,
      email,
      passwordHash,
      avatarUrl,
    });
    await this.userRepository.save(partial);
    return this.userRepository.findOne({ where: { id: partial.id } });
  }
}
