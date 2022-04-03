import { Injectable, Dependencies } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
@Dependencies(UsersService, JwtService)
export class AuthService {
  constructor(usersService, jwtService) {
    this.usersService = usersService;
    this.jwtService = jwtService;
  }

  async validateUser(username, password) {
    const user = await this.usersService.getUserByUsername(username);

    if (user && user.password == password) {
      const { password, ...userToReturn } = user;
      return userToReturn;
    }
    return null;
  }

  async login(user) {
    const payload = { username: user.username, password: user.password };
    return {
      token: this.jwtService.sign(payload)
    }
  }
}
