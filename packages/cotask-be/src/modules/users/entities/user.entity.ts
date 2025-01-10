import { Group } from '@cotask-be/modules/groups';
import { Todo } from '@cotask-be/modules/todos';
import { UsersGroups } from '@cotask-be/modules/users-groups';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'user',
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column({ name: 'password_hash' })
  passwordHash: string;

  @Column({ name: 'avatar_url' })
  avatarUrl: string;

  @Column({ name: 'created_at' })
  createdAt: string;

  @Column({ name: 'updated_at', nullable: true })
  updatedAt: string | null;

  @OneToMany(() => Todo, todo => todo.createdBy)
  todos: Todo[];

  @OneToMany(() => Group, group => group.createdBy)
  groups: Group[];

  @OneToMany(() => UsersGroups, usersGroups => usersGroups.user)
  usersGroups: UsersGroups[];
}
