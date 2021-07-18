import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Course, CourseDocument } from '../schema/Course';
import { Model, ObjectId } from 'mongoose';
import UserRepository from '../../user/service/user.repository';
import { User, UserDocument } from '../../user/schema/User';

@Injectable()
export default class CourseRepository {
  constructor(
    @InjectModel(Course.name) private readonly courseModel: Model<CourseDocument>,
    private readonly userRepository: UserRepository,
  ) {}

  async create(dto, authorId: ObjectId | User) {
    const userProfile = await this.userRepository.findById(authorId);
    if (!userProfile) {
      return { message: 'Author not found' };
    }

    const newCourse: CourseDocument = await this.courseModel.create({ ...dto });

    const updUserProfile = await this.userRepository.update(authorId, {
      courses: [...userProfile.courses, newCourse._id],
    });
    return newCourse;
  }
  

  async invite(id: ObjectId, courseID: ObjectId)
  {  

   const userProfile = await this.userRepository.findById(id)

    const updUserProfile = await this.userRepository.update(id,{
      courses: [...userProfile.courses, courseID]
    });
     
     return updUserProfile
  } 


  async addCourseModule(id: ObjectId, courseID: any)

  {  
  
    const course = await this.courseModel.findById(id)

    return await this.courseModel.findByIdAndUpdate({ _id: id }, {course_module: [...course.course_module, courseID]})


    // return this.courseModel.findByIdAndUpdate({id},{course_module: courseID} );

  } 

  // async addStudents(id:ObjectId, dto, authorId: ObjectId | User)
  // {
  //   const userProfile = await this.userRepository.findById(authorId);
  //   const  course = await this.findById(id);
  //   if(!course)
  //   {
  //     return { message: 'course not found' };
  //   }
  //   if(!userProfile)
  //   {
  //     return { message: 'Author not found' };
  //   }
  
  //   const updCourseStudents = await this.courseModel.findByIdAndUpdate({ _id: id}, students:]  )
  
  // }

  async update(id: ObjectId | Course, dto) {
    const candidate = await this.findById(id);
    if (!candidate) {
      return { message: 'course not found' };
    }

    return this.courseModel.findByIdAndUpdate({ _id: id }, { ...dto });
  }

  async delete(id: ObjectId, authorId: ObjectId) {
    const candidate: CourseDocument = await this.findById(id);
    const userCandidate: UserDocument = await this.userRepository.findById(
      authorId,
    );
    let continues = false;

    if (!candidate) {
      return { message: 'course not found' };
    }
    if (!userCandidate) {
      return { message: 'user not found' };
    }

    if (String(candidate.authorId) !== String(authorId)) {
      return { message: 'author permission error' };
    }

    userCandidate.courses.forEach((course) => {
      if (String(course) === String(id)) {
        continues = true;
      }
    });

    const filteredCourses = userCandidate.courses.filter(
      (course) => String(course) !== String(id),
    );
    if (continues) {
      const updUserCandidate = await this.userRepository.update(authorId, {
        courses: filteredCourses,
      });

      return this.courseModel.findByIdAndDelete({ _id: id });
    }
    return { message: 'course not found' }; 
  }

  async findById(id: ObjectId | Course) {
    const candidate = await this.courseModel.findById(id);
    console.log(candidate);
    return candidate;
  }
}
