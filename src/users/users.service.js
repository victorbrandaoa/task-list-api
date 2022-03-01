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

  async existsUser(email) {
    return this.userModel.exists({ email });
  }

  async getUserByEmail(email) {
    const userExists = await this.existsUser(email);
    if (!userExists) {
      throw new NotFoundException(`User with email ${email} not found.`);
    }
    return this.userModel.findOne({ email });
  }

  async getAllUsers() {
    return this.userModel.find({});
  }

  async postUser(user) {
    const userExists = await this.existsUser(user.email);
    if (userExists) {
      throw new ConflictException(`User with email ${user.email} already exists.`);
    }
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

  async putUser(email, user) {
    await this.getUserByEmail(email);
    return this.userModel.updateOne({ email }, user);
  }

  async deleteUser(email) {
    await this.getUserByEmail(email);
    return this.userModel.deleteOne({ email });
  }

}
