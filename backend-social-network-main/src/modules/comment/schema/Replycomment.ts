import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Post } from '../../post/schema/Post';
import { User } from '../../user/schema/User';
import { PostComment } from './PostComment';

export type ReplyCommentDocument = Replycomment & Document;


@Schema()
 export class Replycomment {
    
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    authorId: User;
  
    @Prop({ type: String, required: true })
    text: string;
  
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'PostComment' })
    parentcommentId: PostComment;
  
  
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
  
  
    @Prop({tpye: String})
    status: string; }

    export const ReplycommentSchema = SchemaFactory.createForClass(Replycomment);
