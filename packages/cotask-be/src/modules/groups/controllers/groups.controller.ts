import { ApiBaseResult, ApiOkResponseResult } from '@cotask-be/common/types';
import { Controller, Get, Query } from '@nestjs/common';
import { ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger';
import { IGroupsService } from '../services/groups.abstract';
import { GetGroupsDto } from '../dtos/get-groups.dto';
import { GroupVo } from '../vos/group.vo';
import { GetGroupsVo } from '../vos/get-groups.vo';

@ApiExtraModels(ApiBaseResult)
@ApiTags('groups')
@Controller('groups')
export class GroupsController {
  constructor(protected readonly groupsService: IGroupsService) {}
  @Get('')
  @ApiOperation({ summary: '根据user_id分页获取分组' })
  @ApiOkResponseResult({ model: GetGroupsVo, description: '分组数据' })
  async getGroups(@Query() query: GetGroupsDto): Promise<GetGroupsVo> {
    const { user_id: userId } = query;
    const [total, groups] = await Promise.all([
      this.groupsService.countUserGroups(userId),
      this.groupsService.getUserGroups(query, userId),
    ]);
    return {
      total,
      data: groups.map(g => new GroupVo(g)),
    };
  }
}