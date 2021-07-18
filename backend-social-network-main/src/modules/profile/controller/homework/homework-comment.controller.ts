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
} from '@nestjs/common';
import JwtGuard from '../../../auth/guard/jwt.guard';
import HomeworkCommentService from '../../service/homework/homework-comment.service';
import { PostCommentVerifiedDto } from '../../../comment/dto/PostCommentDto';
import { ObjectId } from 'mongoose';

@Controller('homeworkcomment')
export default class HomeworkCommentController {
  constructor(private readonly homeworkCommentService: HomeworkCommentService) {}

  @Get(':id')
  async getCommentById(@Param('id') commentId) {
    return this.homeworkCommentService.findByCommentId(commentId);
  }

 
  @Get('author/:id/:post_id')
  async getCommnetAuthor(@Param('id') commentId, @Param('post_id') post_id) {
    return this.homeworkCommentService.getCommnetAuthor(commentId, post_id);
  }




  @Post(':homeworkId')
  @UseGuards(JwtGuard)
  async createComment(
    @Param('homeworkId') homeworkId,
    @Body() dto: PostCommentVerifiedDto,
    @Request() req,
  ) {
    return this.homeworkCommentService.addCommentToHomework(req.user._id, homeworkId, dto, req.user.full_name, req.user.avatar);
  }


  @Get('status/:homeworkId')
  @UseGuards(JwtGuard)
  async ChangeStatus(@Param('homeworkId') homeworkId: ObjectId)
  {
    return this.homeworkCommentService.ChangeStatus(homeworkId)
  }



  @Put(':commentId')
  @UseGuards(JwtGuard)
  async updateComment(
    @Param('commentId') commentId,
    @Body() dto: PostCommentVerifiedDto,
    @Request() req,
  ) {
    return this.homeworkCommentService.updateComment(commentId, req.user._id, dto);
  }





  // @Delete(':commentId')
  // @UseGuards(JwtGuard)
  // async deleteComment(@Param('commentId') commentId, @Request() req) {
  //   return this.homeworkCommentService.deleteComment(commentId, req.user._id);
  // }
}
