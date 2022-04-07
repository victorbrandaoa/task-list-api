import {
  Injectable,
  Dependencies,
  NotFoundException,
  ConflictException,
  BadRequestException
} from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './user.schema';
import * as bcrypt from 'bcrypt';

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
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(user.password, salt);

    const createdUser = new this.userModel({ ...user, password: hashedPassword});
    await createdUser.save();

    return this.getUserByUsername(user.username);
  }

  async putUser(username, user) {
    await this.getUserByUsername(username);

    const { username: newUsername } = user;
    if (newUsername !== username) {
      const userExists = await this.existsUser(newUsername);
      if (userExists) {
        throw new BadRequestException(`Invalid new username. There's another user with the username ${newUsername}`);
      }
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(user.password, salt);

    await this.userModel.updateOne({ username }, { ...user, password: hashedPassword });

    return this.getUserByUsername(newUsername);
  }

  async deleteUser(username) {
    await this.getUserByUsername(username);
    return this.userModel.deleteOne({ username });
  }

}
