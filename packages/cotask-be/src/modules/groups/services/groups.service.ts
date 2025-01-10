import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IGroupsService } from './groups.abstract';
import { BasePaging } from '@cotask-be/common/types';
import { Repository } from 'typeorm';
import { Group } from '../entities/group.entity';
import { GROUP_REPO } from '@cotask-be/common/constans/table-repos';

@Injectable()
export class GroupsService extends IGroupsService {
  constructor(@Inject(GROUP_REPO) protected groupsRepository: Repository<Group>) {
    super();
  }
  async create(
    group: Omit<Group, 'id' | 'createdAt' | 'updatedAt'>,
    createdBy: number
  ): Promise<Group> {
    const entity = this.groupsRepository.create({
      ...group,
      createdBy: { id: createdBy },
    });
    await this.groupsRepository.save(entity);
    return this.groupsRepository.findOne({
      where: { id: entity.id },
      relations: ['createdBy'],
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
