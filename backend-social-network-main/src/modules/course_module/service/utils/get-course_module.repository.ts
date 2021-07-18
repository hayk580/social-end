import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Course_module, Course_moduleDocument } from '../../schema/Course_module'
import { Model } from 'mongoose';
import { UserDocument } from '../../../user/schema/User';

@Injectable()
export default class GetCourse_moduleRepository {
  constructor(
    @InjectModel(Course_module.name) private readonly course_moduleModel: Model<Course_moduleDocument>,
  ) {}

  async getAllCourse_modules(): Promise<Course_moduleDocument[]> {
    return this.course_moduleModel
      .find()
      .populate('authorId')
      .populate('comments')
      .populate('reposts')
      .sort('-createdIn');
  }

  async getSubCourse_modules(subscribtions: UserDocument[]): Promise<Course_moduleDocument[]> {
    return this.course_moduleModel
      .find({ authorId: { $in: subscribtions } })
      .populate('authorId')
      .populate('comments')
      .populate('reposts')
      .sort('-createdIn');
  }
}
