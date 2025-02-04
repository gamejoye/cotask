import { Module } from '@nestjs/common';
import { GroupsService } from './services/groups.service';
import {
  DATA_SOURCE,
  GROUP_REPO,
  USER_REPO,
  USERS_GROUPS_REPO,
} from '@cotask-be/common/constans/table-repos';
import { DataSource } from 'typeorm';
import { Group } from './entities/group.entity';
import { GroupsController } from './controllers/groups.controller';
import { IGroupsService } from './services/groups.abstract';
import { DatabaseModule } from '@cotask-be/modules/database';
import { UsersGroups } from '@cotask-be/modules/users-groups';
import { User } from '@cotask-be/modules/users';

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: IGroupsService,
      useClass: GroupsService,
    },
    {
      provide: GROUP_REPO,
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Group),
      inject: [DATA_SOURCE],
    },
    {
      provide: USER_REPO,
      useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
      inject: [DATA_SOURCE],
    },
    {
      provide: USERS_GROUPS_REPO,
      useFactory: (dataSource: DataSource) => dataSource.getRepository(UsersGroups),
      inject: [DATA_SOURCE],
    },
  ],
  controllers: [GroupsController],
  exports: [IGroupsService],
})
export class GroupsModule {}
