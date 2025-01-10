import { Module } from '@nestjs/common';
import { GroupsService } from './services/groups.service';
import { DATA_SOURCE, GROUP_REPO } from '@cotask-be/common/constans/table-repos';
import { DataSource } from 'typeorm';
import { Group } from './entities/group.entity';
import { GroupsController } from './controllers/groups.controller';
import { IGroupsService } from './services/groups.abstract';
import { DatabaseModule } from '@cotask-be/modules/database';

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
  ],
  controllers: [GroupsController],
  exports: [IGroupsService],
})
export class GroupsModule {}
