import { Injectable } from '@nestjs/common';
import { Model, ObjectId } from 'mongoose';
import { PostComment, PostCommentDocument } from '../../schema/PostComment';
import { PostCommentVerifiedDto } from '../../dto/PostCommentDto';
import PostRepository from '../../../post/service/post.repository';
import { PostDocument } from '../../../post/schema/Post';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../../../user/schema/User';

@Injectable()
export default class PostCommentRepository {
  constructor(
    @InjectModel(PostComment.name)
    private readonly postCommentModel: Model<PostCommentDocument>,
    private readonly postRepository: PostRepository,
  ) {}

  async findById(id: ObjectId) {
    return this.postCommentModel.findById(id);
  }

  async findByIdComment(id: any) {
    return this.postCommentModel.find({postId: id});
  }
  async create(
    authorId: ObjectId,
    postId: ObjectId,
    dto: PostCommentVerifiedDto,
    full_name,
    avatar

    ) {
    const currentDate = new Date();
    const candidatePost: PostDocument = await this.postRepository.findById(
      postId,
    );
    if (!candidatePost) {
      return { message: 'Post Not founde' };
    }

    const newComment: PostCommentDocument = await this.postCommentModel.create({
      ...dto,
      authorId,
      postId,
      createdIn: currentDate,
      updatedIn: currentDate,
      full_name,
      avatar

  
    });
    const updPost = await this.postRepository.update(postId, {
      comments: [...candidatePost.comments, newComment._id],
    });
 
    return newComment;
        
  
  }



  async likePost(authorId, id)
  {
     
    const updt = await this.postCommentModel.findByIdAndUpdate(id, {likes: [authorId]})
    
    return updt
  }




  async update(
    commentId: ObjectId,
    authorId: ObjectId,
    dto: PostCommentVerifiedDto,
  ) {
    const candidate = await this.findById(commentId);
    if (!candidate) {
      return { message: 'comment not found' };
    }

    if (String(candidate.authorId) !== String(authorId)) {
      return { message: 'comment edit error .' };
    }

    return this.postCommentModel.findByIdAndUpdate(
      { _id: commentId },
      { ...dto, updatedIn: new Date(), redact: true },
    );
  }

  async delete(commentId: ObjectId, authorId: ObjectId) {
    const candidate: PostCommentDocument = await this.findById(commentId);
    let continues = false;
    if (!candidate) {
      return { message: 'comment not found' };
    }

    if (String(candidate.authorId) !== String(authorId)) {
      return { message: 'comment edit error' };
    }
    const mainPost = await this.postRepository.findById(candidate.postId);

    mainPost.comments.forEach((comment) => {
      if (String(comment) === String(commentId)) {
        continues = true;
      }
    });

    const filteredComments = mainPost.comments.filter((comment) => {
      return String(comment) !== String(commentId);
    });

    if (continues) {
      const updPost = await this.postRepository.update(candidate.postId, {
        comments: filteredComments,
      });

      return this.postCommentModel.findByIdAndDelete({ _id: commentId });
    }
    return { message: 'comment not found in this post' };
  }
}
