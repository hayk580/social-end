import { ObjectId } from 'mongoose';
import { MaxLength, MinLength } from 'class-validator';

export class PostVerifiedDto {
  @MinLength(5, {
    message: 'min length 5 ',
  })
  @MaxLength(65, {
    message: 'max length 65',
  })
  title: string;

  photo?: any;

  @MinLength(5, {
    message: 'min length 5',
  })
  @MaxLength(335, {
    message: 'max lenth 335',
  })
  desc: string;
}

export type PostDto = {
  readonly _id?: ObjectId;
  readonly authorId?: ObjectId[];
  readonly title?: string;
  readonly photo?: any;
  readonly desc?: string;
  readonly createdId?: Date;
  readonly comments?: ObjectId[];
  readonly reposts?: ObjectId[];
  readonly group_id?: ObjectId[];
};
