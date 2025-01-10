import { UserVo } from '@cotask-be/modules/users';
import { Group } from '../entities/group.entity';
import { ApiProperty } from '@nestjs/swagger';

export class GroupVo {
  @ApiProperty({
    example: 1,
    description: '分组id',
  })
  id: number;

  @ApiProperty({
    example: '学习',
    description: '分组名称',
  })
  name: string;

  @ApiProperty({
    example: '寒假ACM集训',
    description: '分组描述',
  })
  description: string;

  @ApiProperty({
    type: () => UserVo,
    description: '创建人',
  })
  createdBy: UserVo;

  @ApiProperty({
    example: '2022-01-02 00:00:00',
    description: '创建时间',
  })
  createdAt: string;

  @ApiProperty({
    example: '2022-01-01 00:00:00',
    description: '更新时间',
  })
  updatedAt: string | null;
  constructor(group: Group) {
    this.id = group.id;
    this.name = group.name;
    this.description = group.description;
    this.createdBy = new UserVo(group.createdBy);
    this.createdAt = group.createdAt;
    this.updatedAt = group.updatedAt;
  }
}
