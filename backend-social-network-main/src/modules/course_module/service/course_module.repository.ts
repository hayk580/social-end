import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Course_module, Course_moduleDocument } from '../schema/Course_module';
import { Model, ObjectId } from 'mongoose';
import UserRepository from '../../user/service/user.repository';
import { User, UserDocument } from '../../user/schema/User';

@Injectable()
export default class Course_moduleRepository {
  constructor(
    @InjectModel(Course_module.name) private readonly course_moduleModel: Model<Course_moduleDocument>,
    private readonly userRepository: UserRepository,
  ) {}

  async create(dto, authorId: ObjectId | User) {
    const userProfile = await this.userRepository.findById(authorId);
    if (!userProfile) {
      return { message: 'Author not found' };
    }

    const newCourse_module: Course_moduleDocument = await this.course_moduleModel.create({ ...dto });

    const updUserProfile = await this.userRepository.update(authorId, {
      course_modules: [...userProfile.course_modules, newCourse_module._id],
    });
    return newCourse_module;
  }


  async invite(id: ObjectId, course_moduleID: ObjectId)
  {  

   const userProfile = await this.userRepository.findById(id)

    const updUserProfile = await this.userRepository.update(id,{
      course_modules: [...userProfile.course_modules, course_moduleID]
    });
     
     return updUserProfile
  } 


  // async addStudents(id:ObjectId, dto, authorId: ObjectId | User)
  // {
  //   const userProfile = await this.userRepository.findById(authorId);
  //   const  course_module = await this.findById(id);
  //   if(!course_module)
  //   {
  //     return { message: 'course_module not found' };
  //   }
  //   if(!userProfile)
  //   {
  //     return { message: 'Author not found' };
  //   }
  
  //   const updCourse_moduleStudents = await this.course_moduleModel.findByIdAndUpdate({ _id: id}, students:]  )
  
  // }

  async update(id: ObjectId | Course_module, dto) {
    const candidate = await this.findById(id);
    if (!candidate) {
      return { message: 'course_module not found' };
    }

    return this.course_moduleModel.findByIdAndUpdate({ _id: id }, { ...dto });
  }

  async delete(id: ObjectId, authorId: ObjectId) {
    const candidate: Course_moduleDocument = await this.findById(id);
    const userCandidate: UserDocument = await this.userRepository.findById(
      authorId,
    );
    let continues = false;

    if (!candidate) {
      return { message: 'course_module not found' };
    }
    if (!userCandidate) {
      return { message: 'user not found' };
    }

    if (String(candidate.authorId) !== String(authorId)) {
      return { message: 'author permission error' };
    }

    userCandidate.course_modules.forEach((course_module) => {
      if (String(course_module) === String(id)) {
        continues = true;
      }
    });

    const filteredCourse_modules = userCandidate.course_modules.filter(
      (course_module) => String(course_module) !== String(id),
    );
    if (continues) {
      const updUserCandidate = await this.userRepository.update(authorId, {
        course_modules: filteredCourse_modules,
      });

      return this.course_moduleModel.findByIdAndDelete({ _id: id });
    }
    return { message: 'course_module not found' };
  }

  async findById(id: ObjectId | Course_module) {
    const candidate = await this.course_moduleModel.findById(id);
    console.log(candidate);
    return candidate;
  }
}
