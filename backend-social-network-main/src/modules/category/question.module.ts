import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './schema/Category';
import CategoryRepository from './service/category.repository';
import UserModule from '../user/user.module';
import GetCategoryRepository from './service/utils/get-category.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }]),
    forwardRef(() => UserModule),
  ],
  providers: [CategoryRepository, GetCategoryRepository],
  controllers: [],
  exports: [CategoryRepository, GetCategoryRepository],
})
export default class CategoryModule {}
