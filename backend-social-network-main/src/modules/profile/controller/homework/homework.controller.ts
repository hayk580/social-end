import {
    Body,
    Controller, Delete,
    Get,
    Param,
    Post, Put,
    Request,
    Sse,
    MessageEvent,
    UseGuards,
  } from '@nestjs/common';
import HomeworkService from '../../service/homework/homework.service'
import JwtGuard from '../../../auth/guard/jwt.guard';
import { HomeworkDTO, HomeworkVerifiedDto } from '../../../homework/dto/HomeworkDto'
 
import { ObjectId } from 'mongoose';

import { Observable, interval } from 'rxjs';
import  { map } from 'rxjs/operators'
  @Controller('homework')
  export default class HomeworkController {
    constructor(private readonly homeworkService: HomeworkService) {}
  
    @Post('/create')
    @UseGuards(JwtGuard)
    async createHomework(@Body() dto: HomeworkVerifiedDto, @Request() req) {
      const use =  await  this.homeworkService.addHomework(req.user._id, req.user.username, req.user.avatar, dto);
      return use
    }
    
    @Get('/:id')
    async findById(@Param('id') id: ObjectId) {
      return this.homeworkService.findById(id);
    }
  
    @Delete(':id')
    @UseGuards(JwtGuard)
    async deleteHomework(@Request() req, @Param('id') homeworkId: ObjectId) {
      return this.homeworkService.deleteHomework(homeworkId, req.user._id);
    }
  
    @Put(':id')
    @UseGuards(JwtGuard)
    async changeHomework(
      @Request() req,
      @Param('id') homeworkId: ObjectId,
      @Body() dto: HomeworkDTO,
    ) {
      return this.homeworkService.changeHomework(req.user._id, homeworkId, dto);
    }
  }
  