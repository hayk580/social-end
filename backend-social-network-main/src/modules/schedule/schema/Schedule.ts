import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../user/schema/User';
import { PostComment } from '../../comment/schema/PostComment';

export type ScheduleDocument = Schedule & Document;

@Schema()
export class Schedule {

@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  authorId: User;

@Prop({ type: String, ref: 'User' })
  username: User;

  @Prop({ type: String, ref: 'User' })
  avatar: User;

  
  @Prop({ type: String, min: 5, max: 25, required: true})
  title: string;

  @Prop({ type: String, min: 5, max: 25, required: true })
  desc: string;

  @Prop({ type: String, default: '' })
  photo: string;

  @Prop({ type: String, default: '' })
  deadline: string;


  @Prop({type: String, default: 'A'})
  resource: string;
  
  @Prop({type: String, default: 'a'})
  week_day:  string;
  
  @Prop({ type: Date, required: true })
  createdIn: Date;


 



  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PostComment' }],
  })
  comments: PostComment[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  reposts: User[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  students: User[];


  @Prop({ type: String, default: '' })
  course: string;

  @Prop({ type: String, default: '' })
  literature: string;

    
  @Prop({ type: String, default: '' })
  links: string;

     
  @Prop({ type: String, default: '' })
  hourly_schedule: string;

}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);
