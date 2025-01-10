import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth';
import { UsersModule } from './modules/users';
import { TodosModule } from './modules/todos';
import { GroupsModule } from './modules/groups';
import { UsersGroupsModule } from './modules/users-groups';

@Module({
  imports: [AuthModule, UsersModule, TodosModule, GroupsModule, UsersGroupsModule],
})
export class AppModule {}
