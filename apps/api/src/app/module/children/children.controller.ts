import { Body, Controller, Get, Post } from '@nestjs/common';
import { ChildrenService } from './children.service';

@Controller('children')
export class ChildrenController {
  constructor(private readonly childrenService: ChildrenService) {}

  @Get('all')
  findAll() {
    return this.childrenService.findAll();
  }

  @Post('create')
  create(@Body() data: any) {
    return this.childrenService.create(data);
  }
}
