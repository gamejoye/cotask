import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth';
import { UsersModule } from './modules/users';
import { TodosModule } from './modules/todos';
import { GroupsModule } from './modules/groups';
import { UsersGroupsModule } from './modules/users-groups';
import { AiModule } from './modules/ai/ai.module';
import { AppConfig } from './config/app.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [AppConfig],
      isGlobal: true,
      envFilePath: ['.env.development'],
    }),
    AuthModule,
    UsersModule,
    TodosModule,
    GroupsModule,
    UsersGroupsModule,
    AiModule,
  ],
})
export class AppModule {}
