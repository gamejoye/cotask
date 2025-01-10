import { Group } from '@cotask-be/modules/groups';
import { User } from '@cotask-be/modules/users';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user_group' })
export class UsersGroups {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: '关系id',
  })
  id: number;

  @Column({ name: 'joined_at' })
  @ApiProperty({
    example: '2022-01-02 00:00:00',
    description: '加入时间',
  })
  joinedAt: string;

  @ManyToOne(() => User, user => user.usersGroups)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Group, group => group.usersGroups)
  @JoinColumn({ name: 'group_id' })
  group: Group;
}
