import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class User {
  @Prop({ type: mongoose.Schema.Types.String, required: true })
  name;

  @Prop({ type: mongoose.Schema.Types.String, required: true })
  lastName;

  @Prop({ type: mongoose.Schema.Types.String, required: true, unique: true })
  email;

  @Prop({ type: mongoose.Schema.Types.String })
  age;

  @Prop({ type: mongoose.Schema.Types.String, required: true })
  password;

}

export const UserSchema = SchemaFactory.createForClass(User);
