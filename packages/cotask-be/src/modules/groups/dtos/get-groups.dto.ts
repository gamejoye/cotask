import { BasePaging } from '@cotask-be/common/types';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class GetGroupsDto extends BasePaging {
  @IsInt()
  @Type(() => Number)
  @ApiProperty({
    example: 1,
    description: '用户id',
  })
  user_id: number;
}
