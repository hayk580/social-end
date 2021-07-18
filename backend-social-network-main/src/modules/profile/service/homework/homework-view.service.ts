import { Injectable } from '@nestjs/common';
import GetHomeworkRepository from '../../../homework/service/utils/get-homework.repository';

@Injectable()
export default class HomeworkViewService {
  constructor(private readonly getHomeworkRepository: GetHomeworkRepository) {}

  async getAllHomeworks() {
    return this.getHomeworkRepository.getAllHomeworks();
  }

  async getSubHomeworks(subscriptions) {
    return this.getHomeworkRepository.getSubHomeworks(subscriptions);
  }
}
