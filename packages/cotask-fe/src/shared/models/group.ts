import { GroupVo, UserVo } from '@cotask/types';
import { User } from './user';

export class Group implements GroupVo {
  id: number;
  name: string;
  description: string;
  createdBy: UserVo;
  createdAt: string;
  updatedAt: string;
  constructor(group?: Group) {
    this.id = group?.id ?? 0;
    this.name = group?.name ?? '';
    this.description = group?.description ?? '';
    this.createdBy = group?.createdBy ?? new User();
    this.createdAt = group?.createdAt ?? '';
    this.updatedAt = group?.updatedAt ?? '';
  }

  static isEmpty(instance: Group) {
    return instance.id === 0;
  }
}
