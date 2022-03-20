import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class User {
  @Prop({ type: mongoose.Schema.Types.String, required: true, unique: true })
  username;

  @Prop({ type: mongoose.Schema.Types.String, required: true })
  password;

  @Prop({ type: mongoose.Schema.Types.String })
  age;

}

export const UserSchema = SchemaFactory.createForClass(User);
