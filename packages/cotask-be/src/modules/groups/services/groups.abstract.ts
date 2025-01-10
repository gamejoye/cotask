import { Injectable } from '@nestjs/common';
import { Group } from '../entities/group.entity';
import { BasePaging } from '@cotask-be/common/types';

@Injectable()
export abstract class IGroupsService {
  abstract create(
    group: Omit<Group, 'id' | 'createdAt' | 'updatedAt'>,
    createdBy: number
  ): Promise<Group>;
  abstract getById(id: number): Promise<Group>;
  abstract getUserGroups(paging: BasePaging, userId: number): Promise<Group[]>;
  abstract countUserGroups(userId: number): Promise<number>;
}
