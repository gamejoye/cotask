import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateGroupDto {
  @ApiProperty({
    example: '学习',
    description: '分组名称',
  })
  @IsString()
  @MaxLength(100)
  name: string;

  @ApiProperty({
    example: '寒假ACM集训',
    description: '分组描述',
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: 1,
    description: '创建者',
  })
  @IsNumber()
  createdBy: number;
}
