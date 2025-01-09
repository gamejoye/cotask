import { UserVo } from '@cotask-be/modules/users';
import { ApiProperty } from '@nestjs/swagger';

export class LoginVo {
  @ApiProperty({
    description: '用户信息',
    type: UserVo,
  })
  user: UserVo;

  @ApiProperty({
    example: 'token',
    description: '用户token',
  })
  token: string;
}
