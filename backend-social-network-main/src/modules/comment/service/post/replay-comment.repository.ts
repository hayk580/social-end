import { Injectable } from '@nestjs/common';
import { Model, ObjectId } from 'mongoose';
import { PostComment, PostCommentDocument } from '../../schema/PostComment';
import { PostCommentVerifiedDto } from '../../dto/PostCommentDto';
import PostRepository from '../../../post/service/post.repository';
import { PostDocument } from '../../../post/schema/Post';
import { Replycomment, ReplyCommentDocument } from '../../schema/Replycomment'
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../../../user/schema/User';

@Injectable()
export default class ReplyCommentRepository {
  constructor(
    @InjectModel(Replycomment.name)
    private readonly replyCommnetModel: Model<ReplyCommentDocument>
  ) {}



  async createReply(
    authorId: ObjectId,
    parentCommentId: ObjectId,
    dto: PostCommentVerifiedDto,
    full_name,
    avatar
  ) {
    const currentDate = new Date();
    // const candidateComment = await this.postCommentModel.findById(
    //   parentCommentId,
    // ); 
    // if(!candidateComment) {
    //   return { message: 'Comment not found' };
    // }

   const newparentComment: ReplyCommentDocument = await this.replyCommnetModel.create({
      ...dto,
      authorId,
      parentcommentId: parentCommentId,
      createdIn: currentDate,
      updatedIn: currentDate,
      full_name,
      avatar
   });

      return newparentComment
  }

}
