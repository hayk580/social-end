import { Injectable } from '@nestjs/common';
import GetCourse_moduleRepository from '../../../course_module/service/utils/get-course_module.repository';

@Injectable()
export default class Course_moduleViewService {
  constructor(private readonly getCourse_moduleRepository: GetCourse_moduleRepository) {}

  async getAllCourse_modules() {
    return this.getCourse_moduleRepository.getAllCourse_modules();
  }

  async getSubCourse_modules(subscriptions) {
    return this.getCourse_moduleRepository.getSubCourse_modules(subscriptions);
  }
}
