import { Module } from '@nestjs/common';
import { ChildrenService } from './children.service';
import { ChildrenController } from './children.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ChildrenSchema } from './schema/children.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'children', schema: ChildrenSchema }]),
  ],
  controllers: [ChildrenController],
  providers: [ChildrenService],
})
export class ChildrenModule {}
