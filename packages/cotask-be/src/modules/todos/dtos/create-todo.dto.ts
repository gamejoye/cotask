import { FrequencyTypes, PriorityTypes } from '@cotask/types';
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

export class CreateTodoDto {
  @ApiProperty({
    example: 'Learn React',
    description: 'todo标题',
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: '一周之内学会如何使用React写一个应用',
    description: 'todo描述',
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: PriorityTypes.HIGH,
    enum: PriorityTypes,
    description: 'todo优先级',
  })
  @IsOptional()
  @IsEnum(PriorityTypes)
  priority: PriorityTypes | null;

  @ApiProperty({
    example: FrequencyTypes.NONE,
    enum: FrequencyTypes,
    description: 'todo频率',
  })
  @IsEnum(FrequencyTypes)
  frequency: FrequencyTypes;

  @ApiProperty({
    example: null,
    description: 'todo频率选项',
  })
  @IsOptional()
  @IsObject()
  frequencyOption: Record<string, any> | null;

  @ApiProperty({
    example: '2023-01-01',
    description: 'todo截止日期',
  })
  @IsDateString()
  dueDate: string;

  @ApiProperty({
    example: 1,
    description: '创建者id',
  })
  @IsNumber()
  createdBy: number;
}
