import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  @ApiProperty({
    example: 'gamejoye',
    description: '用户名',
  })
  username: string;

  @IsEmail()
  @ApiProperty({
    example: 'gamejoye@gmail.com',
    description: '用户邮箱',
  })
  email: string;

  @IsString()
  @ApiProperty({
    example: '123456..',
    description: '用户密码',
  })
  password: string;

  @IsString()
  @ApiProperty({
    example: '123456',
    description: '验证码',
  })
  code: string;
}
