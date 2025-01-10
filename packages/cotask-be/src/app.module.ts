import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth';
import { UsersModule } from './modules/users';
import { TodosModule } from './modules/todos';

@Module({
  imports: [AuthModule, UsersModule, TodosModule],
})
export class AppModule {}
