import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import * as bcrypt from 'bcrypt';
import { User, IUsersService } from '@cotask-be/modules/users';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: IUsersService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<User> {
    // get user from database by email
    const user = await this.usersService.getByEmail(email);
    console.log('user: ', user);
    const correct = user !== null && (await bcrypt.compare(password, (user as any).passwordHash));
    if (!correct) {
      throw new HttpException('email or password invalid', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}
