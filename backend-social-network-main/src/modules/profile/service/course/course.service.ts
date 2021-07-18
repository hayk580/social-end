import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { CourseDTO } from '../../../course/dto/CourseDto'
import CourseRepository from '../../../course/service/course.repository';
import { Course } from '../../../course/schema/Course';
import { from } from 'rxjs';

@Injectable()
export default class CourseService {
  constructor(private readonly courseRepository: CourseRepository) {}

  async addCourse(authorId: ObjectId, username: string, avatar: string,  dto: CourseDTO) {
    return this.courseRepository.create(
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

  async findById(courseId: ObjectId): Promise<Course> {
    return this.courseRepository.findById(courseId);
  }

  async inviteStudents(id: ObjectId, courseID: ObjectId){
 
     return this.courseRepository.invite(id, courseID)
    
 }


 async addCourseModule(id: ObjectId, courseID: ObjectId){
 
  return this.courseRepository.addCourseModule(id, courseID)
 
}


  async changeCourse(authorId: ObjectId, courseId: ObjectId, dto: CourseDTO) {
    return this.courseRepository.update(courseId, dto);
  }

  async deleteCourse(courseId: ObjectId, authorId: ObjectId) {
    return this.courseRepository.delete(courseId, authorId);
  }
}
