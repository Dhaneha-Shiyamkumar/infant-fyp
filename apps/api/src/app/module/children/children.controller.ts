/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ChildrenService } from './children.service';

@Controller('children')
export class ChildrenController {
  constructor(private readonly childrenService: ChildrenService) {}

  @Get('all')
  findAll() {
    return this.childrenService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.childrenService.findOne(id);
  }

  @Post('/set-attribute/:id/:attribute')
  setAttribute(
    @Param() params: { id: string; attribute: string },
    @Body() data: any
  ) {
    return this.childrenService.setAttribute(params.id, params.attribute, data);
  }

  @Post('create')
  create(@Body() data: any) {
    return this.childrenService.create(data);
  }
}
