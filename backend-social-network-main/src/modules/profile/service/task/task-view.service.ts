import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import GetTaskRepository from '../../../task/service/utils/get-task.repository';

@Injectable()
export default class TaskViewService {
  constructor(private readonly getTaskRepository: GetTaskRepository) {}

  async getAllTasks() {
    return this.getTaskRepository.getAllTasks();
  }

  async getTaskById(id){
    return this.getTaskRepository.getAllTasksById(id);
  }

  async getSubTasks(subscriptions) {
    return this.getTaskRepository.getSubTasks(subscriptions);
  }
}
