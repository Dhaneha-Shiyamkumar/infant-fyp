import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { getCurrentUser } from './current-user.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UserLoginDto } from './dto/login.dto';

@Controller('auth')
@UsePipes(ValidationPipe)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private userService: UsersService
  ) {}

  @Get('/me')
  @UseGuards(AuthGuard('jwt'))
  async currentUser(@getCurrentUser() id: string) {
    return await this.userService.findOneById(id);
  }

  @Post('login')
  async login(@Body() userLoginDto: UserLoginDto) {
    const user = await this.userService.findByLogin(userLoginDto);
    const payload = {
      email: user.email,
    };
    const token = await this.authService.signPayload(payload);
    return { user, token };
  }

  @Post('register')
  async register(@Body() userData: CreateUserDto) {
    const user = await this.userService.create(userData);
    const payload = {
      email: user.email,
    };

    const token = await this.authService.signPayload(payload);
    return { user, token };
  }
}
