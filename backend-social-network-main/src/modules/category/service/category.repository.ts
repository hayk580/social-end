import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from '../schema/Category';
import { Model, ObjectId } from 'mongoose';
import UserRepository from '../../user/service/user.repository';
import { User, UserDocument } from '../../user/schema/User';

@Injectable()
export default class CategoryRepository {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<CategoryDocument>,
    private readonly userRepository: UserRepository,
  ) {}

  async create(dto, authorId: ObjectId | User) {
    const userProfile = await this.userRepository.findById(authorId);
    if (!userProfile) {
      return { message: 'Author not found' };
    }

    const newCategory: CategoryDocument = await this.categoryModel.create({ ...dto });

    const updUserProfile = await this.userRepository.update(authorId, {
      categorys: [...userProfile.categorys, newCategory._id],
    });
    return newCategory;
  }


  async invite(id: ObjectId, categoryID: ObjectId, category_name: string)
  {  

   const userProfile = await this.userRepository.findById(id)

    const updUserProfile = await this.userRepository.update(id,{
      categorys: [...userProfile.categorys, categoryID],
      categorys_name: category_name 
    });
     
     return updUserProfile
  } 


  // async addStudents(id:ObjectId, dto, authorId: ObjectId | User)
  // {
  //   const userProfile = await this.userRepository.findById(authorId);
  //   const  category = await this.findById(id);
  //   if(!category)
  //   {
  //     return { message: 'category not found' };
  //   }
  //   if(!userProfile)
  //   {
  //     return { message: 'Author not found' };
  //   }
  
  //   const updCategoryStudents = await this.categoryModel.findByIdAndUpdate({ _id: id}, students:]  )
  
  // }

  async update(id: ObjectId | Category, dto) {
    const candidate = await this.findById(id);
    if (!candidate) {
      return { message: 'category not found' };
    }

    return this.categoryModel.findByIdAndUpdate({ _id: id }, { ...dto });
  }

  async delete(id: ObjectId, authorId: ObjectId) {
    const candidate: CategoryDocument = await this.findById(id);
    const userCandidate: UserDocument = await this.userRepository.findById(
      authorId,
    );
    let continues = false;

    if (!candidate) {
      return { message: 'category not found' };
    }
    if (!userCandidate) {
      return { message: 'user not found' };
    }

    if (String(candidate.authorId) !== String(authorId)) {
      return { message: 'author permission error' };
    }

    userCandidate.categorys.forEach((category) => {
      if (String(category) === String(id)) {
        continues = true;
      }
    });

    const filteredCategorys = userCandidate.categorys.filter(
      (category) => String(category) !== String(id),
    );
    if (continues) {
      const updUserCandidate = await this.userRepository.update(authorId, {
        categorys: filteredCategorys,
      });

      return this.categoryModel.findByIdAndDelete({ _id: id });
    }
    return { message: 'category not found' };
  }

  async findById(id: ObjectId | Category) {
    const candidate = await this.categoryModel.findById(id);
    console.log(candidate);
    return candidate;
  }
}
