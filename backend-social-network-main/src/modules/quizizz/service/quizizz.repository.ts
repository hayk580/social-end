import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Quizizz, QuizizzDocument } from '../schema/Quizizz';
import { Model, ObjectId } from 'mongoose';
import UserRepository from '../../user/service/user.repository';
import { User, UserDocument } from '../../user/schema/User';

@Injectable()
export default class QuizizzRepository {
  constructor(
    @InjectModel(Quizizz.name) private readonly quizizzModel: Model<QuizizzDocument>,
    private readonly userRepository: UserRepository,
  ) {}

  async create(dto, authorId: ObjectId | User) {
    const userProfile = await this.userRepository.findById(authorId);
    if (!userProfile) {
      return { message: 'Author not found' };
    }

    const newQuizizz: QuizizzDocument = await this.quizizzModel.create({ ...dto });

    const updUserProfile = await this.userRepository.update(authorId, {
      quizizzs: [...userProfile.quizizzs, newQuizizz._id],
    });
    return newQuizizz;
  }


  async invite(id: ObjectId, quizizzID: ObjectId, quizizz_name: string)
  {  

   const userProfile = await this.userRepository.findById(id)

    const updUserProfile = await this.userRepository.update(id,{
      quizizzs: [...userProfile.quizizzs, quizizzID],
      quizizzs_name: quizizz_name 
    });
     
     return updUserProfile
  } 


  // async addStudents(id:ObjectId, dto, authorId: ObjectId | User)
  // {
  //   const userProfile = await this.userRepository.findById(authorId);
  //   const  quizizz = await this.findById(id);
  //   if(!quizizz)
  //   {
  //     return { message: 'quizizz not found' };
  //   }
  //   if(!userProfile)
  //   {
  //     return { message: 'Author not found' };
  //   }
  
  //   const updQuizizzStudents = await this.quizizzModel.findByIdAndUpdate({ _id: id}, students:]  )
  
  // }

  async update(id: ObjectId | Quizizz, dto) {
    const candidate = await this.findById(id);
    if (!candidate) {
      return { message: 'quizizz not found' };
    }

    return this.quizizzModel.findByIdAndUpdate({ _id: id }, { ...dto });
  }

  async delete(id: ObjectId, authorId: ObjectId) {
    const candidate: QuizizzDocument = await this.findById(id);
    const userCandidate: UserDocument = await this.userRepository.findById(
      authorId,
    );
    let continues = false;

    if (!candidate) {
      return { message: 'quizizz not found' };
    }
    if (!userCandidate) {
      return { message: 'user not found' };
    }

    if (String(candidate.authorId) !== String(authorId)) {
      return { message: 'author permission error' };
    }

    userCandidate.quizizzs.forEach((quizizz) => {
      if (String(quizizz) === String(id)) {
        continues = true;
      }
    });

    const filteredQuizizzs = userCandidate.quizizzs.filter(
      (quizizz) => String(quizizz) !== String(id),
    );
    if (continues) {
      const updUserCandidate = await this.userRepository.update(authorId, {
        quizizzs: filteredQuizizzs,
      });

      return this.quizizzModel.findByIdAndDelete({ _id: id });
    }
    return { message: 'quizizz not found' };
  }

  async findById(id: ObjectId | Quizizz) {
    const candidate = await this.quizizzModel.findById(id);
    console.log(candidate);
    return candidate;
  }
}
