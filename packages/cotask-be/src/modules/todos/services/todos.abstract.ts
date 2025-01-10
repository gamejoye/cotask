import { Injectable } from '@nestjs/common';
import { Todo } from '../entities/todo.entity';

@Injectable()
export abstract class ITodosService {
  abstract create(
    todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'completed'>,
    createBy: number
  ): Promise<Todo>;
  abstract delete(id: number): Promise<void>;
  abstract getById(id: number): Promise<Todo>;
}
