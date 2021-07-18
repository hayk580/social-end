      import {
    Body,
    Controller, Delete,
    Get,
    Param,
    Post, Put,
    Request,
    UseGuards,
    
  } from '@nestjs/common';
import CourseService from '../../service/course/course.service'
import JwtGuard from '../../../auth/guard/jwt.guard';
import { CourseDTO, CourseVerifiedDto } from '../../../course/dto/CourseDto'
import { ObjectId } from 'mongoose';
  
  @Controller('course')
  export default class CourseController {
    constructor(private readonly courseService: CourseService) {}
  
    @Post('/create')
    @UseGuards(JwtGuard)
    async createCourse(@Body() dto: CourseVerifiedDto,  @Request() req) {
      return this.courseService.addCourse(req.user._id, req.user.username, req.user.avatar, dto);
    }
  
    @Get(':id')
    async findById(@Param('id') id: ObjectId) {
      return this.courseService.findById(id);
    }


    @Post('invite/:id/:courseID')
   async invite(@Param('id') id: ObjectId, @Param('courseID') courseID: ObjectId) 
   {
     return this.courseService.inviteStudents(id, courseID);
   }
   


   @Post('addcoursemodule/:id/:courseID')
   async addCourseModule(@Param('id') id: ObjectId, @Param('courseID') courseID: ObjectId) 
   {
     return this.courseService.addCourseModule(id, courseID);
   }




   
   @Delete(':id')
    @UseGuards(JwtGuard)
    async deleteCourse(@Request() req, @Param('id') courseId: ObjectId) {
      return this.courseService.deleteCourse(courseId, req.user._id);
    }
  
    @Put(':id')
    @UseGuards(JwtGuard)
    async changeCourse(
      @Request() req,
      @Param('id') courseId: ObjectId,
      @Body() dto: CourseDTO,
    ) {
      return this.courseService.changeCourse(req.user._id, courseId, dto);
    }
  }
  