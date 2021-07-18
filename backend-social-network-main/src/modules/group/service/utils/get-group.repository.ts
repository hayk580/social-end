import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Group, GroupDocument } from '../../schema/Group'
import { Model, ObjectId } from 'mongoose';
import { UserDocument } from '../../../user/schema/User';

@Injectable()
export default class GetGroupRepository {
  constructor(
    @InjectModel(Group.name) private readonly groupModel: Model<GroupDocument>,
  ) {}

  async getAllGroups(): Promise<GroupDocument[]> {
    return this.groupModel
      .find()
      .populate('authorId')
      .populate('comments')
      .populate('reposts')
      .sort('+createdIn');
  }

  async getSubGroups(subscribtions: UserDocument[]): Promise<GroupDocument[]> {
    return this.groupModel
      .find({ authorId: { $in: subscribtions } })
      .populate('authorId')
      .populate('comments')
      .populate('reposts')
      .sort('-createdIn');
  }

  async getAllGroupsById(id: ObjectId){
    return this.groupModel.findById(id)
  }
}
