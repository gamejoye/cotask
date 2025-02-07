import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CompleteTodoDto {
  @ApiProperty({
    example: '学习英语',
    description: '待办事项标题',
  })
  @IsString()
  @IsOptional()
  title: string;

  @ApiProperty({
    example: '每天早上6点起床，学习英语30分钟，然后去上班',
    description: '待办事项描述',
  })
  @IsString()
  @IsOptional()
  description: string;
}
