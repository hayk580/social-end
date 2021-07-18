import { Injectable } from '@nestjs/common';
import GetScheduleRepository from '../../../schedule/service/utils/get-schedule.repository';

@Injectable()
export default class ScheduleViewService {
  constructor(private readonly getScheduleRepository: GetScheduleRepository) {}

  async getAllSchedules() {
    return this.getScheduleRepository.getAllSchedules();
  }

  async getScheduleByCourse(id:any){
    return this.getScheduleRepository.getScheduleByCourse(id);
  }

  async getSubSchedules(subscriptions) {
    return this.getScheduleRepository.getSubSchedules(subscriptions);
  }

  async getSchedule(id)
  {
    return this.getScheduleRepository.getScheduleById(id);
  }
}
