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

@Controller('replycomment')
export default class ReplyCommentController {
  constructor(private readonly relpyCommentService: RelpyCommentService) {}

  


    @Post('/reply/:commentId')
    @UseGuards(JwtGuard)
    async crateReply(
      @Param('commentId') commentId,
      @Body() dto: PostCommentVerifiedDto,
      @Request() req,
    ){
       return this.relpyCommentService.addReplyComment(req.user._id, commentId, dto, req.user.full_name, req.user.avatar)
    }

}
