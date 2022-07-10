import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class Category {
  @Prop({ type: mongoose.Schema.Types.String, required: true })
  name;

  @Prop({ type: mongoose.Schema.Types.String, required: true, unique: true })
  owner;

  @Prop({ type: mongoose.Schema.Types.String })
  description;

}

export const CategorySchema = SchemaFactory.createForClass(Category);
