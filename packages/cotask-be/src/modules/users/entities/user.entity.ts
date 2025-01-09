import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'user',
})
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 987654321, description: '唯一主键' })
  id: number;

  @Column()
  @ApiProperty({ example: 'gamejoye', description: '用户名' })
  username: string;

  @Column()
  @ApiProperty({ example: 'gamejoye@gmail.com', description: '用户名邮箱' })
  email: string;

  @Column({ name: 'password_hash' })
  @ApiProperty({ example: 'xxxxx', description: '经过hash之后的密码' })
  passwordHash: string;

  @Column({ name: 'avatar_url' })
  @ApiProperty({
    example: 'https://avatars.githubusercontent.com/u/88575063?v=4',
    description: '用户头像',
  })
  avatarUrl: string;

  @Column({ name: 'created_at' })
  @ApiProperty({ example: '2022-01-01 00:00:00', description: '创建时间' })
  createdAt: string;

  @Column({ name: 'updated_at' })
  @ApiProperty({ example: '2022-01-01 00:00:00', description: '更新时间' })
  updatedAt: string;
}
