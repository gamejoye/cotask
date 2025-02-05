import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateGroupDto {
  @ApiProperty({
    example: '学习',
    description: '分组名称',
  })
  @IsString()
  @MaxLength(100)
  @IsOptional()
  name?: string;

  @ApiProperty({
    example: '寒假ACM集训',
    description: '分组描述',
  })
  @IsString()
  @IsOptional()
  description?: string;
}
