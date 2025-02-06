import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { GetTodosResult, ITodosService } from './todos.abstract';
import { Todo } from '../entities/todo.entity';
import { GROUP_REPO, TODO_REPO } from '@cotask-be/common/constans/table-repos';
import { Repository, Raw, In } from 'typeorm';
import { BasePaging } from '@cotask-be/common/types';
import { Group } from '@cotask-be/modules/groups';

@Injectable()
export class TodosService extends ITodosService {
  constructor(
    @Inject(TODO_REPO) protected todosRepository: Repository<Todo>,
    @Inject(GROUP_REPO) protected groupsRepository: Repository<Group>
  ) {
    super();
  }
  async getTodosByToday(paging: BasePaging, userId: number): Promise<GetTodosResult> {
    const { _start, _end, _order, _sort } = paging;

    // 获取用户所在的所有群组ID
    const userGroups = await this.groupsRepository
      .createQueryBuilder('group')
      .innerJoin('group.usersGroups', 'usersGroups')
      .where('usersGroups.user.id = :userId', { userId })
      .getMany();

    const groupIds = userGroups.map(group => group.id);
    if (groupIds.length === 0) {
      return {
        todos: [],
        total: 0,
      };
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const [todos, total] = await this.todosRepository.findAndCount({
      where: {
        dueDate: Raw(
          alias => `CAST(${alias} AS DATETIME) >= :start AND CAST(${alias} AS DATETIME) < :end`,
          { start: today, end: tomorrow }
        ),
        completed: false,
        group: {
          id: In(groupIds),
        },
      },
      relations: ['createdBy', 'group'],
      skip: _start,
      take: _end - _start,
      order: {
        [_sort]: _order,
      },
    });
    return {
      todos,
      total,
    };
  }
  async getTodosByUserId(paging: BasePaging, userId: number): Promise<GetTodosResult> {
    const { _start, _end, _order, _sort } = paging;
    // 获取用户所在的所有群组ID
    const userGroups = await this.groupsRepository
      .createQueryBuilder('group')
      .innerJoin('group.usersGroups', 'usersGroups')
      .where('usersGroups.user.id = :userId', { userId })
      .getMany();

    const groupIds = userGroups.map(group => group.id);

    if (groupIds.length === 0) {
      return {
        todos: [],
        total: 0,
      };
    }

    const [todos, total] = await this.todosRepository.findAndCount({
      where: {
        group: {
          id: In(groupIds),
        },
        completed: false,
      },
      relations: ['createdBy', 'group'],
      skip: _start,
      take: _end - _start,
      order: {
        [_sort]: _order,
      },
    });
    return {
      todos,
      total,
    };
  }
  async update(
    todo: Partial<Omit<Todo, 'id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'group'>> &
      Pick<Todo, 'id'>
  ): Promise<Todo> {
    const todoEntity = await this.todosRepository.findOne({
      where: { id: todo.id },
    });
    if (!todoEntity) {
      throw new NotFoundException('Todo not found');
    }
    await this.todosRepository.save({ ...todoEntity, ...todo });
    return this.todosRepository.findOne({
      where: { id: todo.id },
      relations: ['createdBy', 'group'],
    });
  }
  async getTodosByGroupId(paging: BasePaging, groupId: number): Promise<GetTodosResult> {
    const group = await this.groupsRepository.findOne({
      where: { id: groupId },
    });
    if (!group) {
      throw new NotFoundException('Group not found');
    }
    const { _start, _end, _order, _sort } = paging;
    const [todos, total] = await this.todosRepository.findAndCount({
      where: { group: { id: groupId }, completed: false },
      relations: ['createdBy', 'group'],
      skip: _start,
      take: _end - _start,
      order: {
        [_sort]: _order,
      },
    });
    return {
      todos,
      total,
    };
  }
  async create(
    todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'group' | 'completed'>,
    createBy: number,
    group: number
  ): Promise<Todo> {
    const entity = this.todosRepository.create({
      ...todo,
      completed: false,
      createdBy: { id: createBy },
      group: { id: group },
    });
    await this.todosRepository.save(entity);
    return this.todosRepository.findOne({
      where: { id: entity.id },
      relations: ['createdBy', 'group'],
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
      relations: ['createdBy', 'group'],
    });
    if (!todo) {
      throw new NotFoundException('Todo不存在');
    }
    return todo;
  }
}
