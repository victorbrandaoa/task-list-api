import { Controller, Get, Dependencies, Post, Put, Delete, Body, Bind, Param, UseGuards, HttpCode } from '@nestjs/common';
import { UsersService } from './users.service';
import { CategoriesService } from '../categories/categories.service';
import { Validator, Formatter } from '../utils';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
@Dependencies(UsersService, CategoriesService)
export class UsersController {

  constructor(usersService, categoriesService) {
    this.usersService = usersService;
    this.categoriesService = categoriesService;
  }

  @Get(':username')
  @Bind(Param())
  async getUserByUsername(params) {
    const user = await this.usersService.getUserByUsername(params.username);
    return Formatter.formatUser(user);
  }

  @Get()
  async getAllUsers() {
    const users = await this.usersService.getAllUsers();
    return users.map(Formatter.formatUser);
  }

  @Post()
  @Bind(Body())
  async postUser(user) {
    Validator.checkUserValidity(user);
    const savedUser = await this.usersService.postUser(user);
    return Formatter.formatUser(savedUser);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':username')
  @Bind(Body(), Param())
  async putUser(user, params) {
    Validator.checkUserValidity(user);
    const updatedUser = await this.usersService.putUser(params.username, user);
    return Formatter.formatUser(updatedUser);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':username')
  @HttpCode(204)
  @Bind(Param())
  async deleteUser(params) {
    const user = await this.usersService.getUserByUsername(params.username);
    await this.categoriesService.deleteCategories(user.categories);
    return this.usersService.deleteUser(params.username);
  }
}
