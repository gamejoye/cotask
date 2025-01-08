import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { LocalGuard } from '../guards/local.guard';
import { GetUser } from '@cotask-be/common/decorators';
import { User } from '@cotask-be/modules/users';
import { LoginUserDto } from '../dtos/login.dto';
import { LoginVo } from '../vos/login.vo';
import { ApiBody, ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiBaseResult, ApiCreatedResponseResult } from '@cotask-be/common/types';

@ApiExtraModels(ApiBaseResult)
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  @Post('login')
  @UseGuards(LocalGuard)
  @ApiBody({ type: LoginUserDto })
  @ApiOperation({ summary: '用户登录' })
  @ApiCreatedResponseResult({ model: LoginVo, description: '登录成功' })
  async login(
    @GetUser() user: User,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Body() dto: LoginUserDto
  ): Promise<LoginVo> {
    return {
      user,
      token: 'TODO',
    };
  }
}
