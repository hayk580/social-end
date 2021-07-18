import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { PathDto } from '../../../path/dto/pathDto';
import PostRepository from '../../../path/service/utils/post.repository';
import { Path } from '../../../path/schema/Path';

@Injectable()
export default class PathService {
  constructor(private readonly postRepository: PostRepository) {
  }

  async addPost(authorId: ObjectId, dto: PathDto) {
    return this.postRepository.create(
      {
        ...dto,
        authorId,
        createdIn: new Date(),
      },
      authorId,
    );
  }

  async findById(pathId: ObjectId): Promise<Path> {
    return this.postRepository.findById(pathId);
  }

  async changePath(authorId: ObjectId, pathId: ObjectId, dto: PathDto) {
    return this.postRepository.update(pathId, dto);
  }

  async deletePath(pathId: ObjectId, authorId: ObjectId) {
    return this.postRepository.delete(pathId, authorId);
  }

}
