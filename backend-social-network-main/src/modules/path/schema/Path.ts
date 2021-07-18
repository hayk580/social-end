import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../user/schema/User';

export type PathDocument = Path & Document;

@Schema()
export class Path {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  authorId: User;

  @Prop({ tpye: String, min: 5, max: 25, required: true, unique: true })
  title: string;

  @Prop({ type: String, min: 5, max: 25, required: true })
  description: string;

  @Prop({ type: String, min: 5, max: 25, required: true })
  photo: string;

  @Prop({ type: Date, required: true })
  createdIn: Date;

  @Prop({ type: Boolean, required: true })
  permission: boolean;

}

export const PathSchema = SchemaFactory.createForClass(Path);


