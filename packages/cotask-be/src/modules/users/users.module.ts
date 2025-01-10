import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { IUsersService } from './services/users.abstract';
import { DATA_SOURCE, USER_REPO } from '@cotask-be/common/constans/table-repos';
import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import { DatabaseModule } from '@cotask-be/modules/database';

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: IUsersService,
      useClass: UsersService,
    },
    {
      provide: USER_REPO,
      useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
      inject: [DATA_SOURCE],
    },
  ],
  controllers: [UsersController],
  exports: [IUsersService],
})
export class UsersModule {}
