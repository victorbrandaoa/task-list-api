import { Injectable, Dependencies, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
@Dependencies(UsersService, JwtService)
export class AuthService {
  constructor(usersService, jwtService) {
    this.usersService = usersService;
    this.jwtService = jwtService;
  }

  async validateUser(username, password) {
    const user = await this.usersService.getUserByUsername(username);

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const { password, ...userToReturn } = user;
      return userToReturn;
    } else {
      throw new UnauthorizedException(`Wrong password for the user ${username}.`);
    }
  }

  async login(user) {
    const payload = { username: user.username, password: user.password };
    return {
      token: this.jwtService.sign(payload)
    }
  }
}
