import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '@cotask-be/modules/users';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: ['local'],
    }),
    UsersModule,
  ],
  providers: [LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
