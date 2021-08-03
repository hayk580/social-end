import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Course, CourseDocument } from '../../schema/Course'
import { Model } from 'mongoose';
import { UserDocument } from '../../../user/schema/User';

@Injectable()
export default class GetCourseRepository {
  constructor(
    @InjectModel(Course.name) private readonly courseModel: Model<CourseDocument>,
  ) {}

  async getAllCourses(): Promise<CourseDocument[]> {
    return this.courseModel
      .find()
      .populate('authorId')
      .populate('comments')
      .populate('reposts')
      .sort('-createdIn');
  }

  async getSubCourses(subscribtions: UserDocument[]): Promise<CourseDocument[]> {
    return this.courseModel
      .find({ authorId: { $in: subscribtions } })
      .populate('authorId')
      .populate('comments')
      .populate('reposts')
      .sort('-createdIn');
  }


  async getCourseModule(id) 
  {
    return this.courseModel.find({parentId: id})
  } 
}
