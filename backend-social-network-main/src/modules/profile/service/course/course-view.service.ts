import { Injectable } from '@nestjs/common';
import GetCourseRepository from '../../../course/service/utils/get-course.repository';

@Injectable()
export default class CourseViewService {
  constructor(private readonly getCourseRepository: GetCourseRepository) {}

  async getAllCourses() {
    return this.getCourseRepository.getAllCourses();
  }

  async getSubCourses(subscriptions) {
    return this.getCourseRepository.getSubCourses(subscriptions);
  }
}
