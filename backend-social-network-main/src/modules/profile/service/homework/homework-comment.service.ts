import { Injectable } from '@nestjs/common';
import HomeworkCommentRepository from '../../../comment/service/homework/homework-comment.repository';
import { ObjectId } from 'mongoose';
import { PostCommentVerifiedDto } from '../../../comment/dto/PostCommentDto';

@Injectable()
export default class HomeworkCommentService {
  constructor(private readonly homeworkCommentRepository: HomeworkCommentRepository) {}

  async addCommentToHomework(
    userId: ObjectId,
    homeworkId: ObjectId,
    comment: PostCommentVerifiedDto,
    full_name: string,
    avatar: string
  ) {
    return this.homeworkCommentRepository.create(userId, homeworkId,  comment, full_name, avatar);
  }

  async updateComment(commentId: ObjectId, authorId: ObjectId, comment) {
    return this.homeworkCommentRepository.update(commentId, authorId, comment);
  }
  async ChangeStatus(homeworkId: ObjectId)
  {
    return this.homeworkCommentRepository.ChangeStatus(homeworkId)
  }

  // async deleteComment(commentId: ObjectId, authorId: ObjectId) {
  //   return this.homeworkCommentRepository.delete(commentId, authorId);
  // }

  async findByCommentId(commentId) {
    return this.homeworkCommentRepository.findByIdComment(commentId);
  }

  async getCommnetAuthor(commentId, post_id) {
    return this.homeworkCommentRepository.getCommnetAuthor(commentId, post_id);
  }
}
