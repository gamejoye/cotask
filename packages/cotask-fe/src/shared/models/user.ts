import { UserVo } from '@cotask/types';

export class User implements UserVo {
  id: number;
  username: string;
  email: string;
  avatarUrl: string;
  createdAt: string;
  updatedAt: string;
  constructor(user?: User) {
    this.id = user?.id ?? 0;
    this.username = user?.username ?? '';
    this.email = user?.email ?? '';
    this.avatarUrl = user?.avatarUrl ?? '';
    this.createdAt = user?.createdAt ?? '';
    this.updatedAt = user?.updatedAt ?? '';
  }

  static isEmpty(instance: User) {
    return instance.id === 0;
  }
}
