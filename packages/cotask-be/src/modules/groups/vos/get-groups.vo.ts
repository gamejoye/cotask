import { ApiProperty } from '@nestjs/swagger';
import { GroupVo } from './group.vo';

export class GetGroupsVo {
  @ApiProperty({
    example: 1,
    description: '分组总条数',
  })
  total: number;

  @ApiProperty({
    type: () => GroupVo,
    isArray: true,
    description: '分组数据',
  })
  data: GroupVo[];
}
