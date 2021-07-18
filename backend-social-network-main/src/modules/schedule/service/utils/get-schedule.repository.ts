import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Schedule, ScheduleDocument } from '../../schema/Schedule'
import { Model, ObjectId } from 'mongoose';
import { UserDocument } from '../../../user/schema/User';

@Injectable()
export default class GetScheduleRepository {
  constructor(
    @InjectModel(Schedule.name) private readonly scheduleModel: Model<ScheduleDocument>,
  ) {}

  async getAllSchedules(): Promise<ScheduleDocument[]> {
    return this.scheduleModel
      .find()
      .populate('authorId')
      .populate('comments')
      .populate('reposts')
      .sort('-createdIn');
  }

  async getSubSchedules(subscribtions: UserDocument[]): Promise<ScheduleDocument[]> {
    return this.scheduleModel
      .find({ authorId: { $in: subscribtions } })
      .populate('authorId')
      .populate('comments')
      .populate('reposts')
      .sort('-createdIn');
  }

async getScheduleById(id: ObjectId)
{
  return this.scheduleModel.findById(id);
}

async getScheduleByCourse(id: any){
  
  return this.scheduleModel.find({ course: id})

}

}