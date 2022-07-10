import {
  Injectable,
  Dependencies,
  NotFoundException,
  ConflictException,
  BadRequestException
} from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Category } from './category.schema';

@Injectable()
@Dependencies(getModelToken(Category.name))
export class CategoriesService {
  constructor(categoryModel) {
    this.categoryModel = categoryModel;
  }

  async getCategoryById(id) {
    const category = await this.categoryModel.findOne({ _id: id });
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found.`);
    }
    return category;
  }

  async getCategoryFromUserByName(user, categoryName) {
    return {'status': 'not implemented'};
  }

  async postCategory(category) {
    const createdCategory = new this.categoryModel(category);
    const savedCategory = await createdCategory.save();
    
    return this.getCategoryById(savedCategory._id);
    
  }
}