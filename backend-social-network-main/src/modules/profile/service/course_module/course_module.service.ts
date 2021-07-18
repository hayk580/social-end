import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { Course_moduleDTO } from '../../../course_module/dto/Course_modoleDto'
import Course_moduleRepository from '../../../course_module/service/course_module.repository';
import { Course_module } from '../../../course_module/schema/Course_module';
import { from } from 'rxjs';

@Injectable()
export default class Course_moduleService {
  constructor(private readonly course_moduleRepository: Course_moduleRepository) {}

  async addCourse_module(authorId: ObjectId, username: string, avatar: string,  dto: Course_moduleDTO) {
    return this.course_moduleRepository.create(
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

  async findById(course_moduleId: ObjectId): Promise<Course_module> {
    return this.course_moduleRepository.findById(course_moduleId);
  }


  async inviteStudents(id: ObjectId, course_moduleID: ObjectId){
 
     return this.course_moduleRepository.invite(id, course_moduleID)
    
 }




  async changeCourse_module(authorId: ObjectId, course_moduleId: ObjectId, dto: Course_moduleDTO) {
    return this.course_moduleRepository.update(course_moduleId, dto);
  }

  async deleteCourse_module(course_moduleId: ObjectId, authorId: ObjectId) {
    return this.course_moduleRepository.delete(course_moduleId, authorId);
  }
}
