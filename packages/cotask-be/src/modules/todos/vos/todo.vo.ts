import { UserVo } from '@cotask-be/modules/users';
import { Todo } from '../entities/todo.entity';
import { FrequencyTypes, PriorityTypes } from '@cotask/types';
import { ApiProperty } from '@nestjs/swagger';

export class TodoVo {
  @ApiProperty({
    example: 1,
    description: 'todo唯一id',
  })
  id: number;

  @ApiProperty({
    example: 'Learn React',
    description: 'todo标题',
  })
  title: string;

  @ApiProperty({
    example: '一周之内学会如何使用React写一个应用',
    description: 'todo描述',
    nullable: true,
  })
  description: string | null;

  @ApiProperty({
    example: PriorityTypes.HIGH,
    enum: PriorityTypes,
    description: 'todo优先级',
    nullable: true,
  })
  priority: PriorityTypes | null;

  @ApiProperty({
    example: FrequencyTypes.NONE,
    description: 'todo频率',
  })
  frequency: FrequencyTypes;

  @ApiProperty({
    example: null,
    description: 'todo频率选项',
    nullable: true,
  })
  frequencyOption: Record<string, any> | null;

  @ApiProperty({
    example: '2022-01-03',
    description: 'todo截止日期',
  })
  dueDate: string;

  @ApiProperty({
    example: false,
    description: 'todo是否完成',
  })
  completed: boolean;

  @ApiProperty({
    description: '创建者信息',
    type: () => UserVo,
  })
  createdBy: UserVo;

  @ApiProperty({
    example: '2022-01-01 00:00:00',
    description: '创建时间',
  })
  createdAt: string;

  @ApiProperty({
    example: '2022-01-02 00:00:00',
    description: '更新时间',
    nullable: true,
  })
  updatedAt: string | null;
  constructor(todo: Todo) {
    this.id = todo.id;
    this.title = todo.title;
    this.description = todo.description;
    this.priority = todo.priority;
    this.frequency = todo.frequency;
    this.frequencyOption = todo.frequencyOption;
    this.dueDate = todo.dueDate;
    this.completed = todo.completed;
    this.createdBy = todo.createdBy ? new UserVo(todo.createdBy) : null;
    this.createdAt = todo.createdAt;
    this.updatedAt = todo.updatedAt;
  }
}
