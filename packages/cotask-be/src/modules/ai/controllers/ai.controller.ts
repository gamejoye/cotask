import { Body, Controller, Post } from '@nestjs/common';
import { IAiService } from '../services/ai.abstract';
import { ApiOperation } from '@nestjs/swagger';
import { ApiCreatedResponseResult } from '@cotask-be/common/types';
import { CompleteTodoDto } from '../dtos/complete-todo';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: IAiService) {}
  @Post('todo/complete/title')
  @ApiOperation({ summary: '生成待办事项标题' })
  @ApiCreatedResponseResult({
    model: 'string',
    isArray: true,
    description: 'ai生成的待办事项标题',
  })
  async completeTodoTitle(@Body() body: CompleteTodoDto): Promise<string[]> {
    if (!body.title && !body.description) {
      return [];
    }
    return this.aiService.completeTodoTitle(body);
  }
  @Post('todo/complete/description')
  @ApiOperation({ summary: '生成待办事项描述' })
  @ApiCreatedResponseResult({
    model: 'string',
    isArray: true,
    description: 'ai生成的待办事项描述',
  })
  async completeTodoDescription(@Body() body: CompleteTodoDto): Promise<string[]> {
    if (!body.title && !body.description) {
      return [];
    }
    return this.aiService.completeTodoDescription(body);
  }
}
