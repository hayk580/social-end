import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../user/schema/User';
import { PostComment } from '../../comment/schema/PostComment';
import { Group } from '../../group/schema/Group'
export type PostDocument = Post & Document;

@Schema()
export class Post {
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

  @Prop({ type: Date, required: true })
  createdIn: Date;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId }],
  })
  group_id: string[];


  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PostComment' }],
  })
  comments: PostComment[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  reposts: User[];

 
  @Prop({type: [{type: String}]})
  likes: string[];
}

export const PostSchema = SchemaFactory.createForClass(Post);
