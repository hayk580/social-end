import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from '../schema/Post';
import { Model, ObjectId } from 'mongoose';
import UserRepository from '../../user/service/user.repository';
import { User, UserDocument } from '../../user/schema/User';

@Injectable()
export default class PostRepository {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<PostDocument>,
    private readonly userRepository: UserRepository,
  ) {}

  async create(dto, authorId: ObjectId | User) {
    const userProfile = await this.userRepository.findById(authorId);
    if (!userProfile) {
      return { message: 'Author not found' };
    }

    const newPost: PostDocument = await this.postModel.create({ ...dto });

    const updUserProfile = await this.userRepository.update(authorId, {
      posts: [...userProfile.posts, newPost._id],
    });
    return newPost;
  }

  async findByIdGroup(GroupID)
  {
    return this.postModel
    .find({group_id: GroupID})
    .populate('authorId')
    .populate('comments')
    .populate('reposts')
    .sort('+createdIn');
  }


  async likePost(authorId, id)
  {
     
    const updt = await this.postModel.findByIdAndUpdate(id, {likes: [authorId]})
    
    return updt
  }

  async update(id: ObjectId | Post, dto) {
    const candidate = await this.findById(id);
    if (!candidate) {
      return { message: 'post not found' };
    }

    return this.postModel.findByIdAndUpdate({ _id: id }, { ...dto });
  }



  async createPostInGroup(dto, authorId: ObjectId | User, groupId: ObjectId) {
    const userProfile = await this.userRepository.findById(authorId);
    if (!userProfile) {
      return { message: 'Author not found' };
    }

    const newPost: PostDocument = await this.postModel.create({ ...dto, group_id: groupId });

    const updUserProfile = await this.userRepository.update(authorId, {
      posts: [...userProfile.posts, newPost._id],
    });
    return newPost;
  }


  

  async delete(id: ObjectId, authorId: ObjectId) {
    const candidate: PostDocument = await this.findById(id);
    const userCandidate: UserDocument = await this.userRepository.findById(
      authorId,
    );
    let continues = false;

    if (!candidate) {
      return { message: 'post not found' };
    }
    if (!userCandidate) {
      return { message: 'user not found' };
    }

    if (String(candidate.authorId) !== String(authorId)) {
      return { message: 'author permission error' };
    }

    userCandidate.posts.forEach((post) => {
      if (String(post) === String(id)) {
        continues = true;
      }
    });

    const filteredPosts = userCandidate.posts.filter(
      (post) => String(post) !== String(id),
    );
    if (continues) {
      const updUserCandidate = await this.userRepository.update(authorId, {
        posts: filteredPosts,
      });

      return this.postModel.findByIdAndDelete({ _id: id });
    }
    return { message: 'post not found' };
  }

  async findById(id: ObjectId | Post) {
    const candidate = await this.postModel.findById(id);
    console.log(candidate);
    return candidate;
  }
}
