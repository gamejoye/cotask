import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { IUsersService } from './services/users.abstract';

@Module({
  providers: [
    {
      provide: IUsersService,
      useClass: UsersService,
    },
  ],
  controllers: [UsersController],
  exports: [IUsersService],
})
export class UsersModule {}
