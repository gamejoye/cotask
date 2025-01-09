import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class UserVo {
  @ApiProperty({
    description: '用户id',
    example: 1,
  })
  id: number;
  @ApiProperty({
    description: '用户名',
    example: 'gamejoye',
  })
  username: string;
  @ApiProperty({
    description: '用户邮箱',
    example: 'gamejoye@gmail.com',
  })
  email: string;
  @ApiProperty({
    description: '用户头像',
    example: 'https://avatars.githubusercontent.com/u/88575063?v=4',
  })
  avatarUrl: string;
  @ApiProperty({
    description: '创建时间',
    example: '2022-01-02 00:00:00',
  })
  createdAt: string;
  @ApiProperty({
    description: '更新时间',
    example: '2022-01-01 00:00:00',
  })
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
