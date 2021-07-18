import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import GetCategoryRepository from '../../../category/service/utils/get-category.repository';

@Injectable()
export default class CategoryViewService {
  constructor(private readonly getCategoryRepository: GetCategoryRepository) {}

  async getAllCategorys() {
    return this.getCategoryRepository.getAllCategorys();
  }

  async getCategoryById(id){
    return this.getCategoryRepository.getAllCategorysById(id);
  }

  async getSubCategorys(subscriptions) {
    return this.getCategoryRepository.getSubCategorys(subscriptions);
  }
}
