import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ITodosService } from '../services/todos.abstract';
import { ApiExtraModels, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  ApiBaseResult,
  ApiCreatedResponseResult,
  ApiOkResponseResult,
} from '@cotask-be/common/types';
import { TodoVo } from '../vos/todo.vo';
import { CreateTodoDto } from '../dtos/create-todo.dto';

@ApiExtraModels(ApiBaseResult)
@ApiTags('todos')
@Controller('todos')
export class TodosController {
  constructor(protected readonly todosService: ITodosService) {}

  @Get(':id')
  @ApiOperation({ summary: '根据id获取todo' })
  @ApiOkResponseResult({
    model: TodoVo,
    description: '成功todo',
  })
  @ApiResponse({ status: 404, description: 'todo不存在' })
  async getTodoById(@Param('id', ParseIntPipe) id: number): Promise<TodoVo> {
    const todo = await this.todosService.getById(id);
    return new TodoVo(todo);
  }

  @Post('')
  @ApiOperation({ summary: '创建todo' })
  @ApiCreatedResponseResult({
    model: TodoVo,
    description: '成功创建todo',
  })
  async createTodo(@Body() dto: CreateTodoDto): Promise<TodoVo> {
    const todo = await this.todosService.create(dto, dto.createdBy);
    return new TodoVo(todo);
  }
}
