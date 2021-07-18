import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Question, QuestionDocument } from '../../schema/Question'
import { Model, ObjectId } from 'mongoose';
import { UserDocument } from '../../../user/schema/User';

@Injectable()
export default class GetQuestionRepository {
  constructor(
    @InjectModel(Question.name) private readonly questionModel: Model<QuestionDocument>,
  ) {}

  async getAllQuestions(): Promise<QuestionDocument[]> {
    return this.questionModel
      .find()
      .populate('authorId')
      .populate('comments')
      .populate('reposts')
      .sort('-createdIn');
  }

  async getSubQuestions(subscribtions: UserDocument[]): Promise<QuestionDocument[]> {
    return this.questionModel
      .find({ authorId: { $in: subscribtions } })
      .populate('authorId')
      .populate('comments')
      .populate('reposts')
      .sort('-createdIn');
  }

  async getAllQuestionsById(id: ObjectId){
    return this.questionModel.findById(id)
  }
}
