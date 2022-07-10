import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CategoriesService } from '../categories/categories.service';
import { User, UserSchema } from './user.schema';
import { Category, CategorySchema } from '../categories/category.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: User.name, schema: UserSchema },
    { name: Category.name, schema: CategorySchema }
  ])],
  controllers: [UsersController],
  providers: [UsersService, CategoriesService],
  exports: [UsersService]
})
export class UsersModule {}
