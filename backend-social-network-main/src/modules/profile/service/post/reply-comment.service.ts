import { Injectable } from '@nestjs/common';
import PostCommentRepository from '../../../comment/service/post/post-comment.repository';
import ReplyCommentRepository from '../../../comment/service/post/replay-comment.repository'
import { ObjectId } from 'mongoose';
import { PostCommentVerifiedDto } from '../../../comment/dto/PostCommentDto';

@Injectable()
export default class ReplyCommentService {
  constructor(private readonly replyCommentRepository: ReplyCommentRepository) {}


  async addReplyComment(
    userId: ObjectId,
    parentCommentId: ObjectId,
    comment: PostCommentVerifiedDto,
    full_name: string,
    avatar: string
  ) {
    return this.replyCommentRepository.createReply(userId, parentCommentId, comment, full_name, avatar)
  }

}
