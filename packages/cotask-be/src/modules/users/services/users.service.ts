/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { IUsersService } from './users.abstract';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService extends IUsersService {
  getByEmail(email: string): Promise<User> {
    throw new Error('Method not implemented.');
  }
  create(email: string, password: string): Promise<User> {
    throw new Error('Method not implemented.');
  }
}
