import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'The user email is required' })
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'The user password is required' })
  password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'The user firstName is required' })
  firstName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'The user lastName is required' })
  lastName: string;
}
