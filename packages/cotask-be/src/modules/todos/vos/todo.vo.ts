import { UserVo } from '@cotask-be/modules/users';
import { Todo } from '../entities/todo.entity';
import { FrequencyTypes, PriorityTypes } from '@cotask/types';
import { ApiProperty } from '@nestjs/swagger';

export class CircleTimeOptions {
  @ApiProperty({
    example: 1,
    description: '循环周期',
  })
  circleTime: number;

  @ApiProperty({
    example: [1, 2, 3],
    description: '循环周期内选择的日期，如果循环周期无法选择日期，传递空数组就好',
    type: 'integer',
    isArray: true,
  })
  days: number[];
}

export class FrequencyOption {
  @ApiProperty({
    example: FrequencyTypes.DAILY,
    enum: [
      FrequencyTypes.DAILY,
      FrequencyTypes.WEEKLY,
      FrequencyTypes.MONTHLY,
      FrequencyTypes.YEARLY,
    ],
    description: '频率类型（不包括 NONE）',
  })
  type: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';

  @ApiProperty({
    description: '循环周期配置',
    type: CircleTimeOptions,
  })
  options: CircleTimeOptions;
}

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
    enum: FrequencyTypes,
    description: 'todo频率',
  })
  frequency: FrequencyTypes;

  @ApiProperty({
    example: null,
    description: 'todo频率选项',
    type: FrequencyOption,
    nullable: true,
  })
  frequencyOption: FrequencyOption | null;

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
