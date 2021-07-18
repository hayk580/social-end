import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import GetQuestionRepository from '../../../question/service/utils/get-question.repository';

@Injectable()
export default class QuestionViewService {
  constructor(private readonly getQuestionRepository: GetQuestionRepository) {}

  async getAllQuestions() {
    return this.getQuestionRepository.getAllQuestions();
  }

  async getQuestionById(id){
    return this.getQuestionRepository.getAllQuestionsById(id);
  }

  async getSubQuestions(subscriptions) {
    return this.getQuestionRepository.getSubQuestions(subscriptions);
  }
}
