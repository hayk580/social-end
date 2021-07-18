import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../user/schema/User';
import { PostComment } from '../../comment/schema/PostComment';

export type QuizizzDocument = Quizizz & Document;

@Schema()
export class Quizizz {

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
}

export const QuizizzSchema = SchemaFactory.createForClass(Quizizz);
