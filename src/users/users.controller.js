import { Controller, Get, Dependencies, Post, Put, Body, Bind, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
@Dependencies(UsersService)
export class UsersController {

  constructor(usersService) {
    this.usersService = usersService;
  }

  @Get(':email')
  @Bind(Param())
  async getUserByEmail(params) {
    return this.usersService.getUserByEmail(params.email);
  }

  @Get()
  async getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Post()
  @Bind(Body())
  async postUser(user) {
    return this.usersService.postUser(user);
  }

  @Put(':email')
  @Bind(Body(), Param())
  async putUser(user, params) {
    return this.usersService.putUser(params.email, user);
  }

}
