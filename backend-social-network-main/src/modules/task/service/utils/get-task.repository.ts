import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument } from '../../schema/Task'
import { Model, ObjectId } from 'mongoose';
import { UserDocument } from '../../../user/schema/User';

@Injectable()
export default class GetTaskRepository {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<TaskDocument>,
  ) {}

  async getAllTasks(): Promise<TaskDocument[]> {
    return this.taskModel
      .find()
      .populate('authorId')
      .populate('comments')
      .populate('reposts')
      .sort('+createdIn');
  }

  async getSubTasks(subscribtions: UserDocument[]): Promise<TaskDocument[]> {
    return this.taskModel
      .find({ authorId: { $in: subscribtions } })
      .populate('authorId')
      .populate('comments')
      .populate('reposts')
      .sort('-createdIn');
  }

  async getAllTasksById(id: ObjectId){
    return this.taskModel.findById(id)
  }
}
