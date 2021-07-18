import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Request,
  Put,
  Delete,
  Req,
} from '@nestjs/common';
import JwtGuard from '../../../auth/guard/jwt.guard';
import PostCommentService from '../../service/post/post-comment.service';
import { PostCommentVerifiedDto } from '../../../comment/dto/PostCommentDto';
import RelpyCommentService from '../../service/post/reply-comment.service';

@Controller('postcomment')
export default class PostCommentController {
  constructor(private readonly postCommentService: PostCommentService) {}

  @Get(':id')
  async getCommentById(@Param('id') commentId) {
    return this.postCommentService.findByCommentId(commentId);
  }

  @Post(':postId')
  @UseGuards(JwtGuard)
  async createComment(
    @Param('postId') postId,
    @Body() dto: PostCommentVerifiedDto,
    @Request() req,
  ) {
    return this.postCommentService.addCommentToPost(req.user._id, postId, dto, req.user.full_name, req.user.avatar);
  }

  @Post('like/:id')
  @UseGuards(JwtGuard)
  async likePost(@Request() req, @Param('id') id)
  {
   return this.postCommentService.likePost(req.user._id, id)

  }
  

  @Put(':commentId')
  @UseGuards(JwtGuard)
  async updateComment(
    @Param('commentId') commentId,
    @Body() dto: PostCommentVerifiedDto,
    @Request() req,
  ) {
    return this.postCommentService.updateComment(commentId, req.user._id, dto);
  }

  @Delete(':commentId')
  @UseGuards(JwtGuard)
  async deleteComment(@Param('commentId') commentId, @Request() req) {
    return this.postCommentService.deleteComment(commentId, req.user._id);
  }
}
