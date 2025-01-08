import { User } from '@cotask-be/modules/users';
import { ApiProperty } from '@nestjs/swagger';

export class LoginVo {
  @ApiProperty({
    description: '用户信息',
    type: User,
  })
  user: User;

  @ApiProperty({
    example: 'token',
    description: '用户token',
  })
  token: string;
}
