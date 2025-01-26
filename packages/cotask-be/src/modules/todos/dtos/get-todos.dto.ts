import { BasePaging } from '@cotask-be/common/types';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class GetTodosDto extends BasePaging {
  @IsInt()
  @Type(() => Number)
  @ApiProperty({
    example: 1,
    description: '群组id',
  })
  group_id: number;
}
