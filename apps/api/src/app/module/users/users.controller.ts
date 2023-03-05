import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('all')
  getAllUsers() {
    return this.userService.findAll();
  }

  @Post('create')
  async createUser(@Body() userData: CreateUserDto) {
    return await this.userService.create(userData);
  }
}
