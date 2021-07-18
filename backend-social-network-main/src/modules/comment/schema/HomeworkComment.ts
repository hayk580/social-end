import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Homework } from '../../homework/schema/Homework';
import { User } from '../../user/schema/User';

export type HomeworkCommentDocument = HomeworkComment & Document;

@Schema()
export class HomeworkComment {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Homework' })
  homeworkId: Homework;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  authorId: User;

  @Prop({ type: String, required: true })
  text: string;

  @Prop({ type: String, default: "0" })
  status: string;

  @Prop({ type: Date, required: true })
  createdIn: Date;

  @Prop({ type: Date })
  updatedIn: Date;


  @Prop({ type: String,  ref: 'User' })
  full_name: User;

  @Prop({ type: String,  ref: 'User' })
  avatar: User;

  
  @Prop({ type: Boolean, default: false })
  redact: boolean;

  @Prop()
  likes: string[];


}

export const HomeworkCommentSchema = SchemaFactory.createForClass(HomeworkComment);
