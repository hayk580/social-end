import { Injectable } from '@nestjs/common';
import { Model, ObjectId } from 'mongoose';
import { HomeworkComment, HomeworkCommentDocument } from '../../schema/HomeworkComment';
import { HomeworkCommentVerifiedDto } from '../../dto/PostCommentDto';
import HomeworkRepository from '../../../homework/service/homework.repository';
import { HomeworkDocument } from '../../../homework/schema/Homework';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../../../user/schema/User';

@Injectable()
export default class HomworkCommentRepository {
  constructor(
    @InjectModel(HomeworkComment.name)
    private readonly homeworkCommentModel: Model<HomeworkCommentDocument>,
    private readonly homeworkRepository: HomeworkRepository,
  ) {}

  async findById(id: ObjectId) {
    return this.homeworkCommentModel.findById(id);
  }

  async ChangeStatus(homeworkId:any)
  
  {
    
       return this.homeworkCommentModel.findByIdAndUpdate(homeworkId, {status: '1'})
     
  }

  async findByIdComment(id: any) {
    return this.homeworkCommentModel.find({homeworkId: id});
  }


  async getCommnetAuthor(id: any, post_id:any) {
    
    return this.homeworkCommentModel.find({authorId: id} && {homeworkId: post_id})

  } 



  async create(
    authorId: ObjectId,
    homeworkId: ObjectId,
    dto: HomeworkCommentVerifiedDto,
    full_name,
    avatar

    ) {
    const currentDate = new Date();
    const candidateHomework: HomeworkDocument = await this.homeworkRepository.findById(
      homeworkId,
    );
    if (!candidateHomework) {
      return { message: 'Homework Not founde' };
    }

    const newComment: HomeworkCommentDocument = await this.homeworkCommentModel.create({
      ...dto,
      authorId,
      homeworkId,
      createdIn: currentDate,
      updatedIn: currentDate,
      full_name,
      avatar

  
    });
    const updHomework = await this.homeworkRepository.update(homeworkId, {
      comments: [...candidateHomework.comments, newComment._id],
    });
 
    return newComment;
        
  
  }

  async update(
    commentId: ObjectId,
    authorId: ObjectId,
    dto: HomeworkCommentVerifiedDto,
  ) {
    const candidate = await this.findById(commentId);
    if (!candidate) {
      return { message: 'comment not found' };
    }

    if (String(candidate.authorId) !== String(authorId)) {
      return { message: 'comment edit error .' };
    }

    return this.homeworkCommentModel.findByIdAndUpdate(
      { _id: commentId },
      { ...dto, updatedIn: new Date(), redact: true },
    );
  }

  // async delete(commentId: ObjectId, authorId: ObjectId) {
  //   const candidate: HomeworkCommentDocument = await this.findById(commentId);
  //   let continues = false;
  //   if (!candidate) {
  //     return { message: 'comment not found' };
  //   }

  //   if (String(candidate.authorId) !== String(authorId)) {
  //     return { message: 'comment edit error' };
  //   }
  //   const mainHomework = await this.homeworkRepository.findById(candidate.homeworkId);

  //   mainHomework.comments.forEach((comment) => {
  //     if (String(comment) === String(commentId)) {
  //       continues = true;
  //     }
  //   });

  //   const filteredComments = mainHomework.comments.filter((comment) => {
  //     return String(comment) !== String(commentId);
  //   });

  //   if (continues) {
  //     const updHomework = await this.homeworkRepository.update(candidate.homeworkId, {
  //       comments: filteredComments,
  //     });

  //     return this.homeworkCommentModel.findByIdAndDelete({ _id: commentId });
  //   }
  //   return { message: 'comment not found in this homework' };
  // }
}
