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
    const category = await this.categoriesService.getCategoryByOwnerAndName(user.username, params.name);
    return Formatter.formatCategory(category);
  }

  @Post()
  @Bind(Param(), Body())
  async postCategory(params, category) {
    Validator.checkCategoryValidity(category);
    const categoryToPost = { owner: params.username, ...category };
    const savedCategory = await this.categoriesService.postCategory(categoryToPost);
    const addCategoryToUserQuery = { $push: { categories: savedCategory._id } };
    await this.usersService.updateUserCategories(params.username, addCategoryToUserQuery);
    return Formatter.formatCategory(savedCategory);
  }

  @Put(':name')
  @Bind(Param(), Body())
  async putCategory(params, category) {
    const user = await this.usersService.getUserByUsername(params.username);
    Validator.checkCategoryValidity(category);
    const updatedCategory = await this.categoriesService.putCategory(params.name, user.username, category);
    return Formatter.formatCategory(updatedCategory);
  }

  @Delete(':name')
  @HttpCode(204)
  @Bind(Param())
  async deleteCategory(params) {
    const user = await this.usersService.getUserByUsername(params.username);
    const category = await this.categoriesService.getCategoryByOwnerAndName(user.username, params.name);
    const removeCategoryFromUserQuery = { $pull: { categories: category._id } };
    await this.usersService.updateUserCategories(user.username, removeCategoryFromUserQuery);
    return this.categoriesService.deleteCategory(category._id);
  }
}
