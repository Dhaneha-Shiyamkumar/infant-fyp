import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserLoginDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'The user email is required' })
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'The user password is required' })
  password: string;
}
