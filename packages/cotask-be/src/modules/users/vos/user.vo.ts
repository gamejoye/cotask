import { User } from '../entities/user.entity';

export class UserVo {
  id: number;
  username: string;
  email: string;
  avatarUrl: string;
  createdAt: string;
  updatedAt: string;
  constructor(user: User) {
    const { id, username, email, avatarUrl, createdAt, updatedAt } = user;
    this.id = id;
    this.username = username;
    this.email = email;
    this.avatarUrl = avatarUrl;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
