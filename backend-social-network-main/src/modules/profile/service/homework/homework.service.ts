import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { HomeworkDTO } from '../../../homework/dto/HomeworkDto'
import HomeworkRepository from '../../../homework/service/homework.repository';
import { Homework } from '../../../homework/schema/Homework';
import { from } from 'rxjs';

@Injectable()
export default class HomeworkService {
  constructor(private readonly homeworkRepository: HomeworkRepository) {}

  async addHomework(authorId: ObjectId, username: string, avatar: string,  dto: HomeworkDTO) {
    return this.homeworkRepository.create(
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

  async findById(homeworkId: ObjectId): Promise<Homework> {
    return this.homeworkRepository.findById(homeworkId);
  }

  async changeHomework(authorId: ObjectId, homeworkId: ObjectId, dto: HomeworkDTO) {
    return this.homeworkRepository.update(homeworkId, dto);
  }

  async deleteHomework(homeworkId: ObjectId, authorId: ObjectId) {
    return this.homeworkRepository.delete(homeworkId, authorId);
  }
}
