import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { UsersService } from '../users/users.service';
import { User, UserSchema } from '../users/user.schema';
import { Category, CategorySchema } from './category.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Category.name, schema: CategorySchema },
    { name: User.name, schema: UserSchema }
  ])],
  controllers: [CategoriesController],
  providers: [CategoriesService, UsersService],
  exports: [CategoriesService]
})
export class CategoriesModule {}
