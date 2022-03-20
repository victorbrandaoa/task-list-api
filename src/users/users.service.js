import {
  Injectable,
  Dependencies,
  NotFoundException,
  ConflictException
} from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './user.schema';

@Injectable()
@Dependencies(getModelToken(User.name))
export class UsersService {

  constructor(userModel) {
    this.userModel = userModel;
  }

  async existsUser(username) {
    return this.userModel.exists({ username });
  }

  async getUserByUsername(username) {
    const userExists = await this.existsUser(username);
    if (!userExists) {
      throw new NotFoundException(`User ${username} not found.`);
    }
    return this.userModel.findOne({ username });
  }

  async getAllUsers() {
    return this.userModel.find({});
  }

  async postUser(user) {
    const userExists = await this.existsUser(user.username);
    if (userExists) {
      throw new ConflictException(`User ${user.username} already exists.`);
    }
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

  async putUser(username, user) {
    await this.getUserByUsername(username);
    return this.userModel.updateOne({ username }, user);
  }

  async deleteUser(username) {
    await this.getUserByUsername(username);
    return this.userModel.deleteOne({ username });
  }

}
