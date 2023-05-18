/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from '../auth/dto/create-user.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    userService = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllUsers', () => {
    it('should return an array of all users', async () => {
      const expectedResponse = [
        { id: '1', name: 'User 1' },
        { id: '2', name: 'User 2' },
      ];

      //@ts-ignore
      jest.spyOn(userService, 'findAll').mockResolvedValue(expectedResponse);

      const result = await controller.getAllUsers();

      expect(result).toEqual(expectedResponse);
      expect(userService.findAll).toHaveBeenCalled();
    });
  });

  describe('getUserChildren', () => {
    it('should return the children of the user with the given id', async () => {
      const id = '1';
      const expectedResponse = [
        { id: '1', name: 'Child 1' },
        { id: '2', name: 'Child 2' },
      ];

      jest
        .spyOn(userService, 'findOneByIdChildrenPopulate')
        .mockResolvedValue(expectedResponse);

      const result = await controller.getUserChildren(id);

      expect(result).toEqual(expectedResponse);
      expect(userService.findOneByIdChildrenPopulate).toHaveBeenCalledWith(id);
    });
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      //@ts-ignore
      const userData: CreateUserDto = {
        //@ts-ignore
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password',
      };
      const createdUser = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
      };

      //@ts-ignore
      jest.spyOn(userService, 'create').mockResolvedValue(createdUser);

      const result = await controller.createUser(userData);

      expect(result).toEqual(createdUser);
      expect(userService.create).toHaveBeenCalledWith(userData);
    });
  });
});
