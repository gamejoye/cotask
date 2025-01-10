import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { FrequencyTypes, PriorityTypes } from '@cotask/types';
import { User } from '@cotask-be/modules/users';

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

  // TODO 类型完备
  @Column({ name: 'frequency_option', type: 'json', nullable: true })
  frequencyOption: Record<string, any> | null;

  @Column({ name: 'due_date' })
  dueDate: string;

  @Column({ default: false })
  completed: boolean;

  @ManyToOne(() => User, user => user.todos, { nullable: false })
  @JoinColumn({ name: 'created_by' })
  createdBy: User;

  @Column({ name: 'created_at' })
  createdAt: string;

  @Column({ name: 'updated_at', nullable: true })
  updatedAt: string;
}
