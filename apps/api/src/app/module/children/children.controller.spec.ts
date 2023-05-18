/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Test, TestingModule } from '@nestjs/testing';
import { ChildrenController } from './children.controller';
import { ChildrenService } from './children.service';

describe('ChildrenController', () => {
  let controller: ChildrenController;
  let service: ChildrenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChildrenController],
      providers: [ChildrenService],
    }).compile();

    controller = module.get<ChildrenController>(ChildrenController);
    service = module.get<ChildrenService>(ChildrenService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return an array of children', async () => {
      const expectedResponse = [
        { id: '1', name: 'Child 1' },
        { id: '2', name: 'Child 2' },
      ];

      //@ts-ignore
      jest.spyOn(service, 'findAll').mockResolvedValue(expectedResponse);

      const result = await controller.findAll();

      expect(result).toEqual(expectedResponse);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    it('should return the child with the given id', async () => {
      const id = '1';
      const expectedResponse = { id, name: 'Child 1' };

      //@ts-ignore
      jest.spyOn(service, 'findOne').mockResolvedValue(expectedResponse);

      const result = await controller.findById(id);

      expect(result).toEqual(expectedResponse);
      expect(service.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('setAttribute', () => {
    it('should set the attribute of the child with the given id', async () => {
      const id = '1';
      const attribute = 'name';
      const data = { name: 'Updated Name' };

      jest.spyOn(service, 'setAttribute').mockResolvedValue(undefined);

      const result = await controller.setAttribute({ id, attribute }, data);

      expect(result).toBeUndefined();
      expect(service.setAttribute).toHaveBeenCalledWith(id, attribute, data);
    });
  });

  describe('create', () => {
    it('should create a new child', async () => {
      const data = { name: 'New Child' };
      const createdChild = { id: '1', name: 'New Child' };

      //@ts-ignore
      jest.spyOn(service, 'create').mockResolvedValue(createdChild);

      const result = await controller.create(data);

      expect(result).toEqual(createdChild);
      expect(service.create).toHaveBeenCalledWith(data);
    });
  });
});
