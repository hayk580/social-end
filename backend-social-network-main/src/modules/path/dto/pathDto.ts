import { ObjectId } from 'mongoose';
import { MaxLength, MinLength } from 'class-validator';

export class PathVerifiedDto {
  @MinLength(5, {
    message: 'min length5',
  })
  @MaxLength(65, {
    message: 'max length 65',
  })
  title: string;

  photo?: string;

  @MinLength(5, {
    message: 'min length 5',
  })
  @MaxLength(335, {
    message: 'max length 335',
  })
  desc: string;
}


export type PathDto =
  {
    readonly _id?: ObjectId;
    readonly authorID?: ObjectId[];
    readonly title?: string;
    readonly photo?: string;
    readonly description?: string;
    readonly createdIn?: Date;
    readonly permission?: boolean;
  }
