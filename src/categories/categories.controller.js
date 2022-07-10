import { Controller, Get, Dependencies, Post, Put, Delete, Body, Bind, Param, UseGuards, HttpCode } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CategoriesService } from './categories.service';
import { Validator, Formatter } from '../utils';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users/:username/categories')
@Dependencies(UsersService, CategoriesService)
export class CategoriesController {
  constructor(usersService, categoriesService) {
    this.usersService = usersService;
    this.categoriesService = categoriesService;
  }

  @Get(':name')
  @Bind(Param())
  async getCategoryFromUserByName(params) {
    const user = await this.usersService.getUserByUsername(params.username);
    return this.categoriesService.getCategoryFromUserByName(user, params.name);
  }

  @Post()
  @Bind(Param(), Body())
  async postCategory(params, category) {
    const categoryToPost = { owner: params.username, ...category };
    const savedCategory = await this.categoriesService.postCategory(categoryToPost);
    return this.usersService.addCategoryToUser(params.username, savedCategory);
  }
}
