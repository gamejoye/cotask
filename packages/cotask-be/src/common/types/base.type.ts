import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsIn, IsInt, IsString } from 'class-validator';

export class BasePaging {
  @IsInt()
  @Type(() => Number)
  @ApiProperty({
    example: 0,
    description: 'paging起始位置',
  })
  _start: number;

  @IsInt()
  @Type(() => Number)
  @ApiProperty({
    example: 10,
    description: 'paging结束位置（不包括当前）',
  })
  _end: number;

  @IsString()
  @IsIn(['ASC', 'DESC'])
  @ApiProperty({
    example: 'ASC',
    description: '排序方式',
  })
  _order: 'ASC' | 'DESC' = 'ASC';

  @IsString()
  @ApiProperty({
    example: 'id',
    description: '排序所依据的属性',
  })
  _sort: string;
}
