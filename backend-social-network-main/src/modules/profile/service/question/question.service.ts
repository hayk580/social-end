import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { QuestionDTO, QuestionVerifiedInvite } from '../../../question/dto/QuestionDto'
import QuestionRepository from '../../../question/service/question.repository';
import { Question } from '../../../question/schema/Question';
import { from } from 'rxjs';

@Injectable()
export default class QuestionService {
  constructor(private readonly questionRepository: QuestionRepository) {}

  async addQuestion(authorId: ObjectId, username: string, avatar: string,  dto: QuestionDTO) {
    return this.questionRepository.create(
      {
        ...dto,
        authorId,
        username,
        avatar,
        createdIn: new Date(),
      },
      authorId,
    );
  }

  async findById(questionId: ObjectId): Promise<Question> {
    return this.questionRepository.findById(questionId);
  }


  async inviteStudents(id: ObjectId, questionID: ObjectId, question_name: string){
 
     return this.questionRepository.invite(id, questionID, question_name)
    
 }




  async changeQuestion(authorId: ObjectId, questionId: ObjectId, dto: QuestionDTO) {
    return this.questionRepository.update(questionId, dto);
  }

  async deleteQuestion(questionId: ObjectId, authorId: ObjectId) {
    return this.questionRepository.delete(questionId, authorId);
  }
}
