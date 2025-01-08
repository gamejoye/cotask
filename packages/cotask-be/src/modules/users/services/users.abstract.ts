import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';

@Injectable()
export abstract class IUsersService {
  abstract create(email: string, password: string): Promise<User>;
  abstract getByEmail(email: string): Promise<User>;
}
