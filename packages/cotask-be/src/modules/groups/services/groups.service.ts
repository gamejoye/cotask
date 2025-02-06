import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IGroupsService } from './groups.abstract';
import { BasePaging } from '@cotask-be/common/types';
import { DataSource, Repository } from 'typeorm';
import { Group } from '../entities/group.entity';
import {
  DATA_SOURCE,
  GROUP_REPO,
  USERS_GROUPS_REPO,
  USER_REPO,
} from '@cotask-be/common/constans/table-repos';
import { User } from '@cotask-be/modules/users';
import { UsersGroups } from '@cotask-be/modules/users-groups';

@Injectable()
export class GroupsService extends IGroupsService {
  constructor(
    @Inject(GROUP_REPO) protected groupsRepository: Repository<Group>,
    @Inject(USER_REPO) protected usersRepository: Repository<User>,
    @Inject(USERS_GROUPS_REPO) protected userGroupsRepository: Repository<UsersGroups>,
    @Inject(DATA_SOURCE) protected dataSource: DataSource
  ) {
    super();
  }
  async update(
    group: Partial<Pick<Group, 'name' | 'description'>> & Pick<Group, 'id'>
  ): Promise<Group> {
    const existingGroup = await this.groupsRepository.findOne({
      where: { id: group.id },
      relations: ['createdBy'],
    });
    if (!existingGroup) {
      throw new NotFoundException('Group不存在');
    }
    await this.groupsRepository.save({ ...existingGroup, ...group });
    return {
      ...existingGroup,
      ...group,
    };
  }
  async create(
    group: Omit<Group, 'id' | 'createdAt' | 'updatedAt' | 'usersGroups' | 'todos' | 'createdBy'>,
    createdBy: number
  ): Promise<Group> {
    return this.dataSource.transaction(async manager => {
      const createdByUser = await manager.findOne(User, { where: { id: createdBy } });
      if (!createdByUser) {
        throw new NotFoundException('创建者不存在');
      }
      const entity = manager.create(Group, {
        ...group,
        createdBy: createdByUser,
      });
      await manager.save(Group, entity);
      const newGroup = await manager.findOne(Group, {
        where: { id: entity.id },
        relations: ['createdBy'],
      });
      await manager.save(UsersGroups, {
        group: { id: newGroup.id },
        user: { id: createdByUser.id },
      });
      return newGroup;
    });
  }
  async getById(id: number): Promise<Group> {
    const group = await this.groupsRepository.findOne({ where: { id } });
    if (!group) {
      throw new NotFoundException('Group不存在');
    }
    return group;
  }
  async getUserGroups(paging: BasePaging, userId: number): Promise<Group[]> {
    const { _start, _end, _order, _sort } = paging;
    return this.groupsRepository.find({
      where: {
        usersGroups: { user: { id: userId } },
      },
      skip: _start,
      take: _end - _start,
      order: { [_sort]: _order },
      relations: ['createdBy'],
    });
  }
  countUserGroups(userId: number): Promise<number> {
    return this.groupsRepository.count({
      where: { usersGroups: { user: { id: userId } } },
    });
  }
}
