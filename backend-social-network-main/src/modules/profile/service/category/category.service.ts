import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { CategoryDTO, CategoryVerifiedInvite } from '../../../category/dto/CategoryDto'
import CategoryRepository from '../../../category/service/category.repository';
import { Category } from '../../../category/schema/Category';
import { from } from 'rxjs';

@Injectable()
export default class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async addCategory(authorId: ObjectId, username: string, avatar: string,  dto: CategoryDTO) {
    return this.categoryRepository.create(
      {
        ...dto,
        authorId,
        username,
        avatar,
        createdIn: new Date(),
      },
      authorId,
    );
  }

  async findById(categoryId: ObjectId): Promise<Category> {
    return this.categoryRepository.findById(categoryId);
  }


  async inviteStudents(id: ObjectId, categoryID: ObjectId, category_name: string){
 
     return this.categoryRepository.invite(id, categoryID, category_name)
    
 }




  async changeCategory(authorId: ObjectId, categoryId: ObjectId, dto: CategoryDTO) {
    return this.categoryRepository.update(categoryId, dto);
  }

  async deleteCategory(categoryId: ObjectId, authorId: ObjectId) {
    return this.categoryRepository.delete(categoryId, authorId);
  }
}
