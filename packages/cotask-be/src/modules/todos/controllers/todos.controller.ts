import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ITodosService } from '../services/todos.abstract';
import { ApiExtraModels, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  ApiBaseResult,
  ApiCreatedResponseResult,
  ApiOkResponseResult,
} from '@cotask-be/common/types';
import { TodoVo } from '../vos/todo.vo';
import { CreateTodoDto } from '../dtos/create-todo.dto';
import { GetAllTodosDto, GetTodayTodosDto, GetTodosDto } from '../dtos/get-todos.dto';
import { GetTodosVo } from '../vos/get-todos.vo';
import { UpdateTodoDto } from '../dtos/update-todo.dto';

@ApiExtraModels(ApiBaseResult)
@ApiTags('todos')
@Controller('todos')
export class TodosController {
  constructor(protected readonly todosService: ITodosService) {}

  @Get('today')
  @ApiOperation({ summary: '获取今日todo' })
  @ApiOkResponseResult({
    model: GetTodosVo,
    description: '成功todo列表',
  })
  async getTodosByToday(@Query() query: GetTodayTodosDto): Promise<GetTodosVo> {
    /**
     * TODO 未来可能会考虑时区问题
     */
    const { todos, total } = await this.todosService.getTodosByToday(query, query.user_id);
    return { total, data: todos.map(todo => new TodoVo(todo)) };
  }

  @Get('all')
  @ApiOperation({ summary: '获取所有todo' })
  @ApiOkResponseResult({
    model: GetTodosVo,
    description: '成功todo列表',
  })
  async getAllTodos(@Query() query: GetAllTodosDto): Promise<GetTodosVo> {
    const { todos, total } = await this.todosService.getTodosByUserId(query, query.user_id);
    return { total, data: todos.map(todo => new TodoVo(todo)) };
  }

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

  @Get()
  @ApiOperation({ summary: '根据groupId获取todo' })
  @ApiOkResponseResult({
    model: GetTodosVo,
    description: '成功todo列表',
  })
  @ApiResponse({ status: 404, description: 'group不存在' })
  async getTodosByGroupId(@Query() query: GetTodosDto): Promise<GetTodosVo> {
    const { todos, total } = await this.todosService.getTodosByGroupId(query, query.group_id);
    return {
      total,
      data: todos.map(todo => new TodoVo(todo)),
    };
  }

  @Post('')
  @ApiOperation({ summary: '创建todo' })
  @ApiCreatedResponseResult({
    model: TodoVo,
    description: '成功创建todo',
  })
  async createTodo(@Body() dto: CreateTodoDto): Promise<TodoVo> {
    const todo = await this.todosService.create(dto, dto.createdBy, dto.groupId);
    return new TodoVo(todo);
  }

  @Put(':id')
  @ApiOperation({ summary: '更新todo' })
  @ApiOkResponseResult({
    model: TodoVo,
    description: '成功更新todo',
  })
  async updateTodo(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTodoDto
  ): Promise<TodoVo> {
    const todo = await this.todosService.update({ ...dto, id });
    return new TodoVo(todo);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除todo' })
  @ApiOkResponseResult({
    model: 'boolean',
    description: '成功删除todo',
  })
  async deleteTodo(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
    await this.todosService.delete(id);
    return true;
  }
}
