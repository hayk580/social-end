import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Question, QuestionDocument } from '../schema/Question';
import { Model, ObjectId } from 'mongoose';
import UserRepository from '../../user/service/user.repository';
import { User, UserDocument } from '../../user/schema/User';

@Injectable()
export default class QuestionRepository {
  constructor(
    @InjectModel(Question.name) private readonly questionModel: Model<QuestionDocument>,
    private readonly userRepository: UserRepository,
  ) {}

  async create(dto, authorId: ObjectId | User) {
    const userProfile = await this.userRepository.findById(authorId);
    if (!userProfile) {
      return { message: 'Author not found' };
    }

    const newQuestion: QuestionDocument = await this.questionModel.create({ ...dto });

    const updUserProfile = await this.userRepository.update(authorId, {
      questions: [...userProfile.questions, newQuestion._id],
    });
    return newQuestion;
  }


  async invite(id: ObjectId, questionID: ObjectId, question_name: string)
  {  

   const userProfile = await this.userRepository.findById(id)

    const updUserProfile = await this.userRepository.update(id,{
      questions: [...userProfile.questions, questionID],
      questions_name: question_name 
    });
     
     return updUserProfile
  } 


  // async addStudents(id:ObjectId, dto, authorId: ObjectId | User)
  // {
  //   const userProfile = await this.userRepository.findById(authorId);
  //   const  question = await this.findById(id);
  //   if(!question)
  //   {
  //     return { message: 'question not found' };
  //   }
  //   if(!userProfile)
  //   {
  //     return { message: 'Author not found' };
  //   }
  
  //   const updQuestionStudents = await this.questionModel.findByIdAndUpdate({ _id: id}, students:]  )
  
  // }

  async update(id: ObjectId | Question, dto) {
    const candidate = await this.findById(id);
    if (!candidate) {
      return { message: 'question not found' };
    }

    return this.questionModel.findByIdAndUpdate({ _id: id }, { ...dto });
  }

  async delete(id: ObjectId, authorId: ObjectId) {
    const candidate: QuestionDocument = await this.findById(id);
    const userCandidate: UserDocument = await this.userRepository.findById(
      authorId,
    );
    let continues = false;

    if (!candidate) {
      return { message: 'question not found' };
    }
    if (!userCandidate) {
      return { message: 'user not found' };
    }

    if (String(candidate.authorId) !== String(authorId)) {
      return { message: 'author permission error' };
    }

    userCandidate.questions.forEach((question) => {
      if (String(question) === String(id)) {
        continues = true;
      }
    });

    const filteredQuestions = userCandidate.questions.filter(
      (question) => String(question) !== String(id),
    );
    if (continues) {
      const updUserCandidate = await this.userRepository.update(authorId, {
        questions: filteredQuestions,
      });

      return this.questionModel.findByIdAndDelete({ _id: id });
    }
    return { message: 'question not found' };
  }

  async findById(id: ObjectId | Question) {
    const candidate = await this.questionModel.findById(id);
    console.log(candidate);
    return candidate;
  }
}
