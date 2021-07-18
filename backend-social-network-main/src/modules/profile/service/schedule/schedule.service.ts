import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { ScheduleDTO } from '../../../schedule/dto/ScheduleDto'
import ScheduleRepository from '../../../schedule/service/schedule.repository';
import { Schedule } from '../../../schedule/schema/Schedule';
import { from } from 'rxjs';

@Injectable()
export default class ScheduleService {
  constructor(private readonly scheduleRepository: ScheduleRepository) {}

  async addSchedule(authorId: ObjectId, username: string, avatar: string,  dto: ScheduleDTO, week_day) {
    

    return this.scheduleRepository.create(
      {
        ...dto,
        authorId,
        username,
        avatar,
        createdIn: new Date(),
        week_day
      },
      authorId,
    );
  
  }
  async findById(scheduleId: ObjectId): Promise<Schedule> {
    return this.scheduleRepository.findById(scheduleId);
  }

  async findeByWeekDay(day) {
    return this.scheduleRepository.findeByWeekDay(day)
  }


  async inviteStudents(id: ObjectId, scheduleID: ObjectId){
 
     return this.scheduleRepository.invite(id, scheduleID)
    
 }




  async changeSchedule(authorId: ObjectId, scheduleId: ObjectId, dto: ScheduleDTO) {
    return this.scheduleRepository.update(scheduleId, dto);
  }

  async deleteSchedule(scheduleId: ObjectId, authorId: ObjectId) {
    return this.scheduleRepository.delete(scheduleId, authorId);
  }
}
