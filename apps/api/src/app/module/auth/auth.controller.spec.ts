/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { getCurrentUser } from './current-user.decorator';
import { UserLoginDto } from './dto/login.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, UsersService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    userService = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('currentUser', () => {
    it('should return the current user', async () => {
      const id = 'user_id';
      const currentUser = { id, name: 'John Doe', email: 'john@example.com' };

      //@ts-ignore
      jest.spyOn(userService, 'findOneById').mockResolvedValue(currentUser);

      const result = await controller.currentUser(id);

      expect(result).toEqual(currentUser);
      expect(userService.findOneById).toHaveBeenCalledWith(id);
    });
  });

  describe('login', () => {
    it('should return the user and token on successful login', async () => {
      const userLoginDto: UserLoginDto = {
        email: 'john@example.com',
        password: 'password',
      };
      const user = {
        id: 'user_id',
        name: 'John Doe',
        email: 'john@example.com',
        role: 'user',
      };
      const token = 'token';

      //@ts-ignore
      jest.spyOn(userService, 'findByLogin').mockResolvedValue(user);
      jest.spyOn(authService, 'signPayload').mockResolvedValue(token);

      const result = await controller.login(userLoginDto);

      expect(result).toEqual({ user, token });
      expect(userService.findByLogin).toHaveBeenCalledWith(userLoginDto);
      expect(authService.signPayload).toHaveBeenCalledWith({
        email: user.email,
        role: user.role,
      });
    });
  });
});
