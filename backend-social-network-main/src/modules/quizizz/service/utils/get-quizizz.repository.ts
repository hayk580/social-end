import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Quizizz, QuizizzDocument } from '../../schema/Quizizz'
import { Model, ObjectId } from 'mongoose';
import { UserDocument } from '../../../user/schema/User';

@Injectable()
export default class GetQuizizzRepository {
  constructor(
    @InjectModel(Quizizz.name) private readonly quizizzModel: Model<QuizizzDocument>,
  ) {}

  async getAllQuizizzs(): Promise<QuizizzDocument[]> {
    return this.quizizzModel
      .find()
      .populate('authorId')
      .populate('comments')
      .populate('reposts')
      .sort('-createdIn');
  }

  async getSubQuizizzs(subscribtions: UserDocument[]): Promise<QuizizzDocument[]> {
    return this.quizizzModel
      .find({ authorId: { $in: subscribtions } })
      .populate('authorId')
      .populate('comments')
      .populate('reposts')
      .sort('-createdIn');
  }

  async getAllQuizizzsById(id: ObjectId){
    return this.quizizzModel.findById(id)
  }
}
