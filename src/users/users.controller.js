import { Controller, Get, Dependencies, Post, Put, Delete, Body, Bind, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Validator } from '../utils';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
@Dependencies(UsersService)
export class UsersController {

  constructor(usersService) {
    this.usersService = usersService;
  }

  @Get(':username')
  @Bind(Param())
  async getUserByUsername(params) {
    return this.usersService.getUserByUsername(params.username);
  }

  @Get()
  async getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Post()
  @Bind(Body())
  async postUser(user) {
    Validator.checkUserValidity(user);
    return this.usersService.postUser(user);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':username')
  @Bind(Body(), Param())
  async putUser(user, params) {
    Validator.checkUserValidity(user);
    return this.usersService.putUser(params.username, user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':username')
  @Bind(Param())
  async deleteUser(params) {
    return this.usersService.deleteUser(params.username);
  }
}
