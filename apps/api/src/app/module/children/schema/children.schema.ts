import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ChildrenDocument = Children & Document;

class Attributes {
  weight: {
    month: string;
    value: string;
  }[];
  height: {
    month: string;
    value: string;
  }[];

  vaccination: {
    month: string;
    type: string;
    date: string;
    done: boolean;
  }[];
}

@Schema()
export class Children {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  attributes: Attributes;
}

export const ChildrenSchema = SchemaFactory.createForClass(Children);
