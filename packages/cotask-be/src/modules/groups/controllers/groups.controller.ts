import {
  ApiBaseResult,
  ApiCreatedResponseResult,
  ApiOkResponseResult,
} from '@cotask-be/common/types';
import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger';
import { IGroupsService } from '../services/groups.abstract';
import { GetGroupsDto } from '../dtos/get-groups.dto';
import { GroupVo } from '../vos/group.vo';
import { GetGroupsVo } from '../vos/get-groups.vo';
import { CreateGroupDto } from '../dtos/create-group.dto';
import { UpdateGroupDto } from '../dtos/update-group.dto';

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

  @Post('')
  @ApiOperation({ summary: '创建分组' })
  @ApiCreatedResponseResult({ model: GroupVo, description: '分组数据' })
  async createGroup(@Body() body: CreateGroupDto): Promise<GroupVo> {
    // TODO 支持附带邀请用户功能
    const group = await this.groupsService.create(body, body.createdBy);
    return new GroupVo(group);
  }

  @Put(':id')
  @ApiOperation({ summary: '更新群组' })
  @ApiOkResponseResult({ model: GroupVo, description: '分组更新后的数据' })
  async updateGroup(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateGroupDto
  ): Promise<GroupVo> {
    const group = await this.groupsService.update({ ...body, id });
    return new GroupVo(group);
  }
}
