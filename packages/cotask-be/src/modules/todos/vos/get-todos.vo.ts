import { ApiProperty } from '@nestjs/swagger';
import { TodoVo } from './todo.vo';

export class GetTodosVo {
  @ApiProperty({
    example: 1,
    description: '待办事项总条数',
  })
  total: number;

  @ApiProperty({
    type: () => TodoVo,
    isArray: true,
    description: '待办事项数据',
  })
  data: TodoVo[];
}
