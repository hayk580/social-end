import { ObjectId } from 'mongoose';
import { MaxLength, MinLength } from 'class-validator';

export class ScheduleVerifiedDto {
  @MinLength(5, {
    message: 'min length 5 ',
  })
  @MaxLength(65, {
    message: 'max length 65',
  })
  title: string;

  photo?: any;

  count: number;

  countInWeek: number;



  week_day:string

  @MinLength(5, {
    message: 'min length 5',
  })
  @MaxLength(335, {
    message: 'max lenth 335',
  })
  desc: string;
}

export type ScheduleDTO = {
  readonly _id?: ObjectId;
  readonly authorId?: ObjectId[];
  readonly title?: string;
  readonly photo?: any;
  readonly desc?: string;
  readonly deadline?: string;
  readonly createdId?: Date;
  readonly comments?: ObjectId[];
  readonly reposts?: ObjectId[];
  readonly students?: ObjectId[];
  readonly course?: string;
  readonly literature?: string;
  readonly links?: string;
  readonly hourly_schedule?: string;
  readonly count?: number;
  readonly countInWeek?: number;
  readonly resource?: string;
  readonly week_day?: string;
};
