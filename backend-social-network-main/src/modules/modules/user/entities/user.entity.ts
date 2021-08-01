import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = Users & Document;

@Schema({
  toJSON: {
    transform: (doc: UserDocument, ret) => {
      delete ret.__v;
      ret.id = ret._id;
      delete ret._id;
      delete ret.password;
    },
  },
})
export class Users {
  @Prop({ required: false, type: mongoose.Schema.Types.String })
  username: string;

  @Prop({ required: true, unique: true, type: mongoose.Schema.Types.String })
  email: string;

  @Prop({ required: false, type: mongoose.Schema.Types.String })
  password: string;


  @Prop({ required: true, type: mongoose.Schema.Types.String })
  firstname: string;

  @Prop({ required: true, type: mongoose.Schema.Types.String })
  lastname: string;

  @Prop({ required: true, type: mongoose.Schema.Types.String })
  gender: string;

  @Prop({ required: true, type: mongoose.Schema.Types.String })
  course: string;

  @Prop({ required: true, type: mongoose.Schema.Types.String })
  city: string;

  @Prop({ required: true, type: mongoose.Schema.Types.String })
  address: string;

  @Prop({ required: true, type: mongoose.Schema.Types.String })
  phone: string;


  @Prop({ type: mongoose.Schema.Types.Boolean, default: false })
  online: boolean;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
