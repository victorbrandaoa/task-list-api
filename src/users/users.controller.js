import { Controller, Get, Dependencies, Post, Body, Bind } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
@Dependencies(UsersService)
export class UsersController {

  constructor(usersService) {
    this.usersService = usersService;
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
}
