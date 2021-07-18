import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Path, PathDocument } from '../../schema/Path';
import { Model, ObjectId } from 'mongoose';
import UserRepository from '../../../user/service/user.repository';
import { User, UserDocument } from '../../../user/schema/User';

@Injectable()
export default class PostRepository {
  constructor(
    @InjectModel(Path.name) private readonly postModel: Model<PathDocument>,
    private readonly userRepository: UserRepository,
  ) {}

  async create(dto, authorId: ObjectId | User) {
    const userProfile = await this.userRepository.findById(authorId);
    if (!userProfile) {
      return { message: 'Author not found!!!' };
    }
    const newPost: PathDocument = await this.postModel.create({ ...dto });

    const updUserProfile = await this.userRepository.update(authorId, {
      posts: [...userProfile.posts, newPost._id],
    });
    return newPost;
  }

  async update(id: ObjectId | Path, dto) {
    const candidate = await this.findById(id);
    if (!candidate) {
      return { message: 'post not found' };
    }
    return this.postModel.findByIdAndUpdate({ _id: id }, { ...dto });

  }

  async delete(id: ObjectId, authorId: ObjectId) {
    const candidate: PathDocument = await this.findById(id);
    const userCandidate: UserDocument = await this.userRepository.findById(
      authorId,
    );
    let continus = false;
    if (!candidate) {
      return { message: 'user not found' };
    }
    if (!userCandidate) {
      return { message: 'user not found' };
    }
    if (String(candidate.authorId) !== String(authorId)) {
      return { message: 'author permission error' };
    }

    userCandidate.posts.forEach((path) => {
      if (String(path) === String(id)) {
        continus = true;
      }
    });
    const filterefPahs = userCandidate.posts.filter(
      (post) => String(post) !== String(id),
    );
    if (continus) {
      const updUserCandidate = await this.userRepository.update(authorId, {
        posts: filterefPahs,
      });
      return this.postModel.findByIdAndUpdate({ _id: id });
    }
    return { message: 'post not found' };
  }

  async findById(id: ObjectId | Path) {
    const candidate = await this.postModel.findById(id);
    console.log(candidate);
    return candidate;
  }
}
