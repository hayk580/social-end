      import {
    Body,
    Controller, Delete,
    Get,
    Param,
    Post, Put,
    Request,
    UseGuards,
    
  } from '@nestjs/common';
import QuestionService from '../../service/question/question.service'
import JwtGuard from '../../../auth/guard/jwt.guard';
import { QuestionDTO, QuestionVerifiedDto, QuestionVerifiedInvite } from '../../../question/dto/QuestionDto'
import { ObjectId } from 'mongoose';
  
  @Controller('question')
  export default class QuestionController {
    constructor(private readonly questionService: QuestionService) {}
  
    @Post('/create')
    @UseGuards(JwtGuard)
    async createQuestion(@Body() dto: QuestionVerifiedDto, @Request() req) {
      return this.questionService.addQuestion(req.user._id, req.user.username, req.user.avatar, dto);
    }
  
    @Get(':id')
    async findById(@Param('id') id: ObjectId) {
      return this.questionService.findById(id);
    }

    


    @Post('invite/:id/:questionID')
   async invite(@Body('question_name') question_name: string, @Param('id') id: ObjectId, @Param('questionID') questionID: ObjectId) 
   {
     return this.questionService.inviteStudents(id, questionID, question_name);
   }
   

   
   @Delete(':id')
    @UseGuards(JwtGuard)
    async deleteQuestion(@Request() req, @Param('id') questionId: ObjectId) {
      return this.questionService.deleteQuestion(questionId, req.user._id);
    }
  
    @Put(':id')
    @UseGuards(JwtGuard)
    async changeQuestion(
      @Request() req,
      @Param('id') questionId: ObjectId,
      @Body() dto: QuestionDTO,
    ) {
      return this.questionService.changeQuestion(req.user._id, questionId, dto);
    }
  }
  