import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../user/schema/User';
import { PostComment } from '../../comment/schema/PostComment';
import { Course_module } from 'src/modules/course_module/schema/Course_module';

export type CourseDocument = Course & Document;

@Schema()
export class Course {



  

  @Prop({ type: String, default: '' })
  photo: string;

  @Prop({ type: String, default: '' })
  deadline: string;
  

  @Prop({ type: Date, required: true })
  createdIn: Date;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PostComment' }],
  })


  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  reposts: User[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  students: User[];




  @Prop({ type: String, default: '' })
  parentId: string;


  @Prop({ type: String, default: '' })
  start: string;


  @Prop({ type: String, default: '' })
  end: string;


  @Prop({ type: String, default: '' })
  title: string;

  @Prop({ type: String, default: '' })
  color: string;

  @Prop({ type: String, default: '' })
  id: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
