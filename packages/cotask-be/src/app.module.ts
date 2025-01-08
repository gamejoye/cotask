import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users';

@Module({
  imports: [AuthModule, UsersModule],
})
export class AppModule {}
