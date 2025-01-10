import { User } from '@cotask-be/modules/users';
import { UsersGroups } from '@cotask-be/modules/users-groups';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'group' })
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ name: 'created_at' })
  createdAt: string;

  @Column({ name: 'updated_at', nullable: true })
  updatedAt: string | null;

  @ManyToOne(() => User, user => user.groups, { nullable: false })
  @JoinColumn({ name: 'created_by' })
  createdBy: User;

  @OneToMany(() => UsersGroups, usersGroups => usersGroups.group)
  usersGroups: UsersGroups[];
}
