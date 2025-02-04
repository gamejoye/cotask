import { Injectable } from '@nestjs/common';
import { Todo } from '../entities/todo.entity';
import { BasePaging } from '@cotask-be/common/types';

@Injectable()
export abstract class ITodosService {
  abstract create(
    todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'group' | 'completed'>,
    createBy: number,
    group: number
  ): Promise<Todo>;
  abstract delete(id: number): Promise<void>;
  abstract getById(id: number): Promise<Todo>;
  abstract update(
    todo: Partial<Omit<Todo, 'id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'group'>> &
      Pick<Todo, 'id'>
  ): Promise<Todo>;
  abstract getTodosByGroupId(paging: BasePaging, groupId: number): Promise<Todo[]>;
  abstract getTodosByToday(paging: BasePaging, userId: number): Promise<Todo[]>;
  abstract getTodosByUserId(paging: BasePaging, userId: number): Promise<Todo[]>;
}
