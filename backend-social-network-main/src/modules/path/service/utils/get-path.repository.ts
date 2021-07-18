import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Path, PathDocument } from '../../schema/Path';
import { Model } from 'mongoose';
import { UserDocument } from '../../../user/schema/User';

@Injectable()
export default class GetPathRepository {
  constructor(
    @InjectModel(Path.name) private readonly  postModel: Model<PathDocument>,
  ) {}

  async getAllPaths(): Promise<PathDocument[]> {
    return this.postModel
      .find()
      .populate('authorID')
      .sort('-createdIn');
  }

}
