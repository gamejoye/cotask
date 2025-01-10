import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ITodosService } from './todos.abstract';
import { Todo } from '../entities/todo.entity';
import { TODO_REPO } from '@cotask-be/common/constans/table-repos';
import { Repository } from 'typeorm';

@Injectable()
export class TodosService extends ITodosService {
  constructor(@Inject(TODO_REPO) protected todosRepository: Repository<Todo>) {
    super();
  }
  async create(
    todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'completed'>,
    createBy: number
  ): Promise<Todo> {
    const entity = this.todosRepository.create({
      ...todo,
      completed: false,
      createdBy: { id: createBy },
    });
    await this.todosRepository.save(entity);
    return this.todosRepository.findOne({
      where: { id: entity.id },
      relations: ['createdBy'],
    });
  }
  async delete(id: number): Promise<void> {
    await this.todosRepository.delete({
      id,
    });
  }
  async getById(id: number): Promise<Todo> {
    const todo = await this.todosRepository.findOne({
      where: { id },
      relations: ['createdBy'],
    });
    if (!todo) {
      throw new NotFoundException('Todo不存在');
    }
    return todo;
  }
}
