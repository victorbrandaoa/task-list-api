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

  async existsCategory(name, owner) {
    return this.categoryModel.exists({ name, owner });
  }

  async getCategoryByOwnerAndName(owner, name) {
    const categoryExists = await this.existsCategory(name, owner);
    if (!categoryExists) {
      throw new NotFoundException(`Category with name ${name} not found.`);
    }
    return this.categoryModel.findOne({ owner, name });
  }

  async putCategory(name, owner, category) {
    await this.getCategoryByOwnerAndName(owner, name);

    const { name: newName } = category;
    if (newName !== name) {
      const categoryExists = await this.existsCategory(newName, owner);
      if (categoryExists) {
        throw new BadRequestException(`Invalid new name. You have another category with the name ${newName}`);
      }
    }

    await this.categoryModel.updateOne({ name, owner }, category);

    return this.getCategoryByOwnerAndName(owner, newName);
  }

  async deleteCategory(categoryId) {
    return this.categoryModel.deleteOne({ _id: categoryId });
  }

  async deleteCategories(categoriesIds) {
    return this.categoryModel.deleteMany({ _id: { $in: categoriesIds }});
  }

  async getCategoriesById(categoryIds) {
    return this.categoryModel.find({ _id: { $in: categoryIds  }});
  }

  async postCategory(category) {
    const categoryExists = await this.existsCategory(category.name, category.owner);
    if (categoryExists) {
      throw new ConflictException(`Invalid new name. You have another category with the name ${category.name}`);
    }

    const createdCategory = new this.categoryModel(category);
    const savedCategory = await createdCategory.save();
    
    return this.getCategoryById(savedCategory._id);
    
  }
}