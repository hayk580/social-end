import { ObjectId } from 'mongoose';
import { MaxLength, MinLength } from 'class-validator';

export class QuestionVerifiedDto {
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

export class QuestionVerifiedInvite {
 
  @MinLength(5, {
    message: 'min length 5 ',
  })
  @MaxLength(65, {
    message: 'max length 65',
  })
  questions_name: string

}


export type QuestionDTO = {
  readonly _id?: ObjectId;
  readonly authorId?: ObjectId[];
  readonly title?: string;
  readonly photo?: any;
  readonly desc?: string;
  readonly deadline?: string;
  readonly createdId?: Date;
  readonly comments?: ObjectId[];
  readonly students?: ObjectId[];
  readonly questions_name?: string;
  readonly answers?: string[];
  readonly correct_answer?: number;
  readonly point?: number;
  readonly level?: string;
};
