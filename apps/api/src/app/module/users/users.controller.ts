import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('all')
  getAllUsers() {
    return this.userService.findAll();
  }

  @Get('children/:id')
  getUserChildren(@Param('id') id: string) {
    return this.userService.findOneByIdChildrenPopulate(id);
  }

  @Post('create')
  async createUser(@Body() userData: CreateUserDto) {
    return await this.userService.create(userData);
  }
}
