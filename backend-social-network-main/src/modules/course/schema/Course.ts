import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../user/schema/User';
import { PostComment } from '../../comment/schema/PostComment';
import { Course_module } from 'src/modules/course_module/schema/Course_module';

export type CourseDocument = Course & Document;

@Schema()
export class Course {

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

  @Prop({  type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course_module'}] })
    course_module: Course_module[];


  comments: PostComment[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  reposts: User[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  students: User[];
}

export const CourseSchema = SchemaFactory.createForClass(Course);
