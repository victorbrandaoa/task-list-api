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
    return this.categoriesService.getCategoryByOwnerAndName(user.username, params.name);
  }

  @Post()
  @Bind(Param(), Body())
  async postCategory(params, category) {
    const categoryToPost = { owner: params.username, ...category };
    const savedCategory = await this.categoriesService.postCategory(categoryToPost);
    await this.usersService.addCategoryToUser(params.username, savedCategory);
    return savedCategory;
  }

  @Put(':name')
  @Bind(Param(), Body())
  async putCategory(params, category) {
    const user = await this.usersService.getUserByUsername(params.username);
    return this.categoriesService.putCategory(params.name, user.username, category);
  }

  @Delete(':name')
  @Bind(Param())
  async deleteCategory(params) {
    const user = await this.usersService.getUserByUsername(params.username);
    const category = await this.categoriesService.getCategoryByOwnerAndName(user.username, params.name);
    await this.usersService.removeCategoryFromUser(user.username, category._id);
    return this.categoriesService.deleteCategory(category._id);
  }
}
