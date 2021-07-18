import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Homework, HomeworkDocument } from '../schema/Homework';
import { Model, ObjectId } from 'mongoose';
import UserRepository from '../../user/service/user.repository';
import { User, UserDocument } from '../../user/schema/User';

@Injectable()
export default class HomeworkRepository {
  constructor(
    @InjectModel(Homework.name) private readonly homeworkModel: Model<HomeworkDocument>,
    private readonly userRepository: UserRepository,
  ) {}

  async create(dto, authorId: ObjectId | User) {
    const userProfile = await this.userRepository.findById(authorId);
    if (!userProfile) {
      return { message: 'Author not found' };
    }

    const newHomework: HomeworkDocument = await this.homeworkModel.create({ ...dto });

    const updUserProfile = await this.userRepository.update(authorId, {
      homeworks: [...userProfile.homeworks, newHomework._id],
    });
    return newHomework;
  }

  async update(id: ObjectId | Homework, dto) {
    const candidate = await this.findById(id);
    if (!candidate) {
      return { message: 'homework not found' };
    }

    return this.homeworkModel.findByIdAndUpdate({ _id: id }, { ...dto });
  }

  async delete(id: ObjectId, authorId: ObjectId) {
    const candidate: HomeworkDocument = await this.findById(id);
    const userCandidate: UserDocument = await this.userRepository.findById(
      authorId,
    );
    let continues = false;

    if (!candidate) {
      return { message: 'homework not found' };
    }
    if (!userCandidate) {
      return { message: 'user not found' };
    }

    if (String(candidate.authorId) !== String(authorId)) {
      return { message: 'author permission error' };
    }

    userCandidate.homeworks.forEach((homework) => {
      if (String(homework) === String(id)) {
        continues = true;
      }
    });

    const filteredHomeworks = userCandidate.homeworks.filter(
      (homework) => String(homework) !== String(id),
    );
    if (continues) {
      const updUserCandidate = await this.userRepository.update(authorId, {
        homeworks: filteredHomeworks,
      });

      return this.homeworkModel.findByIdAndDelete({ _id: id });
    }
    return { message: 'homework not found' };
  }

  async findById(id: ObjectId | Homework) {
    const candidate = await this.homeworkModel.findById(id);
    console.log(candidate);
    return candidate;
  }
}
