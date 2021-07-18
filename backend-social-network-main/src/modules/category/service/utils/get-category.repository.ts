import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from '../../schema/Category'
import { Model, ObjectId } from 'mongoose';
import { UserDocument } from '../../../user/schema/User';

@Injectable()
export default class GetCategoryRepository {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<CategoryDocument>,
  ) {}

  async getAllCategorys(): Promise<CategoryDocument[]> {
    return this.categoryModel
      .find()
      .populate('authorId')
      .populate('comments')
      .populate('reposts')
      .sort('-createdIn');
  }

  async getSubCategorys(subscribtions: UserDocument[]): Promise<CategoryDocument[]> {
    return this.categoryModel
      .find({ authorId: { $in: subscribtions } })
      .populate('authorId')
      .populate('comments')
      .populate('reposts')
      .sort('-createdIn');
  }

  async getAllCategorysById(id: ObjectId){
    return this.categoryModel.findById(id)
  }
}
