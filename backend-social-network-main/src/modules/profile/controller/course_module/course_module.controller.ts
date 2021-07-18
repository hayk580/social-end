      import {
    Body,
    Controller, Delete,
    Get,
    Param,
    Post, Put,
    Request,
    UseGuards,
    
  } from '@nestjs/common';
import Course_moduleService from '../../service/course_module/course_module.service'
import JwtGuard from '../../../auth/guard/jwt.guard';
import { Course_moduleDTO, Course_moduleVerifiedDto } from '../../../course_module/dto/Course_modoleDto'
import { ObjectId } from 'mongoose';
  
  @Controller('course_module')
  export default class Course_moduleController {
    constructor(private readonly course_moduleService: Course_moduleService) {}
  
    @Post('/create')
    @UseGuards(JwtGuard)
    async createCourse_module(@Body() dto: Course_moduleVerifiedDto,  @Request() req) {
      return this.course_moduleService.addCourse_module(req.user._id, req.user.username, req.user.avatar, dto);
    }
  
    @Get(':id')
    async findById(@Param('id') id: ObjectId) {
      return this.course_moduleService.findById(id);
    }


    @Post('invite/:id/:course_moduleID')
   async invite(@Param('id') id: ObjectId, @Param('course_moduleID') course_moduleID: ObjectId) 
   {
     return this.course_moduleService.inviteStudents(id, course_moduleID);
   }
   

   
   @Delete(':id')
    @UseGuards(JwtGuard)
    async deleteCourse_module(@Request() req, @Param('id') course_moduleId: ObjectId) {
      return this.course_moduleService.deleteCourse_module(course_moduleId, req.user._id);
    }
  
    @Put(':id')
    @UseGuards(JwtGuard)
    async changeCourse_module(
      @Request() req,
      @Param('id') course_moduleId: ObjectId,
      @Body() dto: Course_moduleDTO,
    ) {
      return this.course_moduleService.changeCourse_module(req.user._id, course_moduleId, dto);
    }
  }
  