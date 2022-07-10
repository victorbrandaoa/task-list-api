import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class Category {
  @Prop({ type: mongoose.Schema.Types.String, required: true })
  name;

  @Prop({ type: mongoose.Schema.Types.String, required: true })
  owner;

  @Prop({ type: mongoose.Schema.Types.String })
  description;

}

const CategorySchema = SchemaFactory.createForClass(Category);
CategorySchema.index({ name: 1, owner: 1 }, { unique: true });

export { CategorySchema };
