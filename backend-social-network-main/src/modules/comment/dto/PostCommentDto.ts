import { ObjectId } from 'mongoose';
import { MaxLength, MinLength } from 'class-validator';

export class PostCommentVerifiedDto {
  @MinLength(1, {
    message: 'min length 5',
  })
  
  text: string;
}


export class HomeworkCommentVerifiedDto {
  @MinLength(5, {
    message: 'min length 5',
  })
  @MaxLength(65, {
    message: 'max length 65',
  })
  text: string;
}

export type PostCommentDto = {
  readonly postId: ObjectId;
  readonly authorId: ObjectId;
  readonly text: string;
  readonly createdIn: Date;
  readonly updatedIn: Date;
  readonly redact: boolean;
  readonly likes: string[];
  readonly status:string;
};
