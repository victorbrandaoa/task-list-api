import { Injectable, Dependencies } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './user.schema';

@Injectable()
@Dependencies(getModelToken(User.name))
export class UsersService {

  constructor(userModel) {
    this.userModel = userModel;
  }

  async postUser(user) {
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

  async getAllUsers() {
    return this.userModel.find().exec();
  }
}
