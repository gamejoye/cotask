import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { FrequencyTypes, PriorityTypes } from '@cotask/types';
import { User } from '@cotask-be/modules/users';
import { Group } from '@cotask-be/modules/groups';

@Entity({
  name: 'todo',
})
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({
    type: 'enum',
    nullable: true,
    enum: PriorityTypes,
  })
  priority: PriorityTypes | null;

  @Column({
    type: 'enum',
    enum: FrequencyTypes,
    default: FrequencyTypes.NONE,
  })
  frequency: FrequencyTypes;

  @Column({ name: 'frequency_option', type: 'json', nullable: true })
  frequencyOption: {
    type: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';
    options: {
      circleTime: number;
      days: number[];
    };
  } | null;

  @Column({ name: 'due_date' })
  dueDate: string;

  @Column({ default: false })
  completed: boolean;

  @ManyToOne(() => Group, group => group.todos, { nullable: false })
  @JoinColumn({ name: 'group_id' })
  group: Group;

  @ManyToOne(() => User, user => user.todos, { nullable: false })
  @JoinColumn({ name: 'created_by' })
  createdBy: User;

  @Column({ name: 'created_at' })
  createdAt: string;

  @Column({ name: 'updated_at', nullable: true })
  updatedAt: string;
}
