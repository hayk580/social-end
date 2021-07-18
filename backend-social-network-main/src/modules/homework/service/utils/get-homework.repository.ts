import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Homework, HomeworkDocument } from '../../schema/Homework';
import { Model } from 'mongoose';
import { UserDocument } from '../../../user/schema/User';

@Injectable()
export default class GetHomeworkRepository {
  constructor(
    @InjectModel(Homework.name) private readonly homeworkModel: Model<HomeworkDocument>,
  ) {}

  async getAllHomeworks(): Promise<HomeworkDocument[]> {
    return this.homeworkModel
      .find()
      .populate('authorId')
      .populate('comments')
      .populate('reposts')
      .sort('+createdIn');
  }

  async getSubHomeworks(subscribtions: UserDocument[]): Promise<HomeworkDocument[]> {
    return this.homeworkModel
      .find({ authorId: { $in: subscribtions } })
      .populate('authorId')
      .populate('comments')
      .populate('reposts')
      .sort('-createdIn');
  }
}
