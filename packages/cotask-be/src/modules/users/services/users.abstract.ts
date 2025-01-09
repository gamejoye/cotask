import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';

@Injectable()
export abstract class IUsersService {
  abstract create(
    username: string,
    email: string,
    password: string,
    avatarUrl: string
  ): Promise<User>;
  abstract getByEmail(email: string): Promise<User>;
}
