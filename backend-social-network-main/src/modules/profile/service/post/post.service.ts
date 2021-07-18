import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { PostDto } from '../../../post/dto/PostDto';
import PostRepository from '../../../post/service/post.repository';
import { Post } from '../../../post/schema/Post';

@Injectable()
export default class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  async addPost(authorId: ObjectId, username: string, avatar: string,  dto: PostDto) {
    return this.postRepository.create(
      {
        ...dto,
        authorId,
        username,
        avatar,
        createdIn: new Date(),
      },
      authorId,
    );
  }

  async createPostInGroup(authorId: ObjectId, username: string, avatar: string,  dto: PostDto, groupId: ObjectId) {
    return this.postRepository.createPostInGroup(
      {
        ...dto,
        authorId,
        username,
        avatar,
        createdIn: new Date(),
        
      },
      authorId,
      groupId
    );
  }


  async likePost(authorId: ObjectId, id: ObjectId)
  {
    return this.postRepository.likePost(authorId, id)
  }

  async findById(postId: ObjectId): Promise<Post> {
    return this.postRepository.findById(postId);
  }


async findByGroupId(groupID: ObjectId)
{
  return this.postRepository.findByIdGroup(groupID)  
}




  async changePost(authorId: ObjectId, postId: ObjectId, dto: PostDto) {
    return this.postRepository.update(postId, dto);
  }

  async deletePost(postId: ObjectId, authorId: ObjectId) {
    return this.postRepository.delete(postId, authorId);
  }

}
