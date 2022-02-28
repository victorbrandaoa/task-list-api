import { Injectable, Dependencies } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './user.schema';

@Injectable()
@Dependencies(getModelToken(User.name))
export class UsersService {

  constructor(userModel) {
    this.userModel = userModel;
  }

  async getUserByEmail(email) {
    return this.userModel.findOne({ email });
  }

  async getAllUsers() {
    return this.userModel.find({});
  }

  async postUser(user) {
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

  async putUser(email, user) {
    const userToUpdate = this.getUserByEmail(email);
    return this.userModel.updateOne({ email }, user);
  }

}
