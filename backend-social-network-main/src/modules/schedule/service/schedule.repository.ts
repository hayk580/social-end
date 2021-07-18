import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Schedule, ScheduleDocument } from '../schema/Schedule';
import { Model, ObjectId } from 'mongoose';
import UserRepository from '../../user/service/user.repository';
import { User, UserDocument } from '../../user/schema/User';
import { ScheduleDTO } from '../dto/ScheduleDto'

@Injectable()
export default class ScheduleRepository {
  constructor(
    @InjectModel(Schedule.name) private readonly scheduleModel: Model<ScheduleDocument>,
    private readonly userRepository: UserRepository,
  ) {}

  async create(dto, authorId: ObjectId | User) {
    const userProfile = await this.userRepository.findById(authorId);
    if (!userProfile) {
      return { message: 'Author not found' };
    }
    const count = dto.count;

    const newSchedule: ScheduleDocument = await this.scheduleModel.create({ ...dto, week_day: dto.week_day  });
     
    const updUserProfile = await this.userRepository.update(authorId, {
      schedules: [...userProfile.schedules, newSchedule._id],
    });
  
    return newSchedule;
     
  }


  async invite(id: ObjectId, scheduleID: ObjectId)
  {  

   const userProfile = await this.userRepository.findById(id)

    const updUserProfile = await this.userRepository.update(id,{
      schedules: [...userProfile.schedules, scheduleID]
    });
     
     return updUserProfile
  } 


  // async addStudents(id:ObjectId, dto, authorId: ObjectId | User)
  // {
  //   const userProfile = await this.userRepository.findById(authorId);
  //   const  schedule = await this.findById(id);
  //   if(!schedule)
  //   {
  //     return { message: 'schedule not found' };
  //   }
  //   if(!userProfile)
  //   {
  //     return { message: 'Author not found' };
  //   }
  
  //   const updScheduleStudents = await this.scheduleModel.findByIdAndUpdate({ _id: id}, students:]  )
  
  // }

  async update(id: ObjectId | Schedule, dto) {
    const candidate = await this.findById(id);
    if (!candidate) {
      return { message: 'schedule not found' };
    }

    return this.scheduleModel.findByIdAndUpdate({ _id: id }, { ...dto });
  }

  async delete(id: ObjectId, authorId: ObjectId) {
    const candidate: ScheduleDocument = await this.findById(id);
    const userCandidate: UserDocument = await this.userRepository.findById(
      authorId,
    );
    let continues = false;

    if (!candidate) {
      return { message: 'schedule not found' };
    }
    if (!userCandidate) {
      return { message: 'user not found' };
    }

    if (String(candidate.authorId) !== String(authorId)) {
      return { message: 'author permission error' };
    }

    userCandidate.schedules.forEach((schedule) => {
      if (String(schedule) === String(id)) {
        continues = true;
      }
    });

    const filteredSchedules = userCandidate.schedules.filter(
      (schedule) => String(schedule) !== String(id),
    );
    if (continues) {
      const updUserCandidate = await this.userRepository.update(authorId, {
        schedules: filteredSchedules,
      });

      return this.scheduleModel.findByIdAndDelete({ _id: id });
    }
    return { message: 'schedule not found' };
  }

  async findById(id: ObjectId | Schedule) {
    const candidate = await this.scheduleModel.findById(id);
    console.log(candidate);
    return candidate;
  }

  async findeByWeekDay(day) {
    return this.scheduleModel.find({week_day: day})
  }
}
