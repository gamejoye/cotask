import { Injectable } from '@nestjs/common';
import { Todo } from '../entities/todo.entity';
import { BasePaging } from '@cotask-be/common/types';

export type GetTodosResult = {
  todos: Todo[];
  total: number;
};

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
  abstract getTodosByGroupId(paging: BasePaging, groupId: number): Promise<GetTodosResult>;
  abstract getTodosByToday(paging: BasePaging, userId: number): Promise<GetTodosResult>;
  abstract getTodosByUserId(paging: BasePaging, userId: number): Promise<GetTodosResult>;
}
