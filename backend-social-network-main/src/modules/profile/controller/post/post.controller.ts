import {
  Body,
  Controller, Delete,
  Get,
  Param,
  Post, Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import PostService from '../../service/post/post.service';
import JwtGuard from '../../../auth/guard/jwt.guard';
import { PostDto, PostVerifiedDto } from '../../../post/dto/PostDto';
import { ObjectId } from 'mongoose';
import { group } from 'console';

@Controller('post')
export default class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UseGuards(JwtGuard)
  async createPost(@Body() dto: PostVerifiedDto, @Request() req) {
    return this.postService.addPost(req.user._id, req.user.username, req.user.avatar, dto);
  }

  @Post('groupPost/:groupId')
  @UseGuards(JwtGuard)
  async createPostInGroup( @Body() dto: PostVerifiedDto, @Request() req, @Param('groupId') groupId: ObjectId, ) {
    return this.postService.createPostInGroup(req.user._id, req.user.username, req.user.avatar, dto, groupId);
  }


  @Post('like/:id')
  @UseGuards(JwtGuard)
  async likePost(@Request() req, @Param('id') id: ObjectId)
  {
   return this.postService.likePost(req.user._id, id)

  }
  
  
  @Get(':id')
  async findById(@Param('id') id: ObjectId) {
    return this.postService.findById(id);
  }

  @Get('groupPosts/:groupID')
  async findByGroupId(@Param('groupID') groupID: ObjectId){

      return this.postService.findByGroupId(groupID)
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  async deletePost(@Request() req, @Param('id') postId: ObjectId) {
    return this.postService.deletePost(postId, req.user._id);
  }

  @Put(':id')
  @UseGuards(JwtGuard)
  async changePost(
    @Request() req,
    @Param('id') postId: ObjectId,
    @Body() dto: PostDto,
  ) {
    return this.postService.changePost(req.user._id, postId, dto);
  }
}
