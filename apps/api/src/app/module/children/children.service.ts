import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChildrenDocument } from './schema/children.schema';

@Injectable()
export class ChildrenService {
  constructor(
    @InjectModel('children')
    private readonly childrenModel: Model<ChildrenDocument>
  ) {}

  async findAll() {
    return await this.childrenModel.find({});
  }

  async findOne(id: string) {
    return await this.childrenModel.findById(id);
  }

  async create(data: any) {
    return await new this.childrenModel(data).save();
  }
}
