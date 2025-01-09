import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { LocalGuard } from '../guards/local.guard';
import { GetUser } from '@cotask-be/common/decorators';
import { IUsersService, User, UserVo } from '@cotask-be/modules/users';
import { LoginUserDto } from '../dtos/login.dto';
import { LoginVo } from '../vos/login.vo';
import { ApiBody, ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiBaseResult, ApiCreatedResponseResult } from '@cotask-be/common/types';
import { RegisterUserDto } from '../dtos/register.dto';

@ApiExtraModels(ApiBaseResult)
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(protected readonly usersService: IUsersService) {}

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
      user: new UserVo(user),
      token: 'TODO',
    };
  }

  @Post('register')
  @ApiBody({ type: RegisterUserDto })
  @ApiOperation({ summary: '用户注册' })
  @ApiCreatedResponseResult({ model: UserVo, description: '注册成功' })
  async register(@Body() dto: RegisterUserDto): Promise<UserVo> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { username, email, password, code } = dto;
    // TODO verify code
    // TODO default avatarUrl
    const user = await this.usersService.create(username, email, password, '');
    return new UserVo(user);
  }
}
