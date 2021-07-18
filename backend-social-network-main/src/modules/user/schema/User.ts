import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Role } from '../dto/UserDto';
import { Post } from '../../post/schema/Post';
import { Homework } from '../../homework/schema/Homework';
import { Schedule } from '../../schedule/schema/Schedule'
import { UserComment } from '../../comment/schema/UserComment';
import { Group } from 'src/modules/group/schema/Group';
import { Course } from 'src/modules/course/schema/Course'
import { from } from 'rxjs';
import { Quizizz } from 'src/modules/quizizz/schema/Quizizz';
import { Question } from 'src/modules/question/schema/Question';
import { Category } from 'src/modules/category/schema/Category';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ type: String, min: 5, max: 45, required: true, unique: true })
  email: string;

  @Prop({ type: String, min: 5, max: 35, required: true })
  username: string;

  @Prop({ type: String, min: 5, max: 35, required: true })
  full_name: string;

  @Prop({ type: String, min: 5, max: 105 })
  desc: string;

  @Prop({ type: String, min: 5, max: 205, required: false })
  password: string;

  @Prop({ type: String, min: 5, max: 205, default: 'avatar.jpg' })
  avatar: string;

  @Prop({ type: String, min: 5, max: 205, default: 'cover.jpg' })
  cover: string;


  
  @Prop([String])
  photos: string[];

  @Prop({ type: String, min: 5, max: 25, default: 'Not specified' })
  country: string;

  @Prop({ type: String, min: 5, max: 25, default: 'Not specified' })
  state: string;

  @Prop({ type: Date, required: true })
  registredIn: Date;Post

  @Prop({ type: Boolean, default: false })
  verify: boolean;

  @Prop({ type: Boolean, default: false })
  confirmed: boolean;

  @Prop({ type: Boolean, default: false })
  online: boolean;

  @Prop({ type: String, enum: Role, default: 'USER' })
  role: Role;

  @Prop({ type: String })
  website: string;



  @Prop({ type: String, default: 'Not specified' })
  phone: string;



  @Prop({ type: String, default: 'Not specified' })
  occupation: string;


  @Prop({ type: Date, default: '' })
  birthdate: Date;


  @Prop({ type: String })
  skills: string;


  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  friends: User[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  subscribers: User[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  subscriptions: User[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }] })
  posts: Post[];


  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }] })
  homeworks: Homework[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }] })
  groups: Group[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Quizizz' }] })
  quizizzs: Quizizz[];

  
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }] })
  schedules: Schedule[];


  
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }] })
  course_modules: Course[];


  
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }] })
  courses: Course[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }] })
  questions: Question[];


  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }] })
  categorys: Category[];


  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId }] })
  tasks: string[];
  

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }] })
  reposts: Post[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserComment' }],
  })
  comments: UserComment[];

  @Prop()
  postComments: string[];



  @Prop({ type:  String, default: ' ' } )
  groups_name: any;

}

export const UserSchema = SchemaFactory.createForClass(User);
