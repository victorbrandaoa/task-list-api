import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class User {
  @Prop({ type: mongoose.Schema.Types.String, required: true })
  name;

  @Prop({ type: mongoose.Schema.Types.String, required: true })
  age;

}

export const UserSchema = SchemaFactory.createForClass(User);
