import {
    Body,
    Controller, Delete,
    Get,
    Param,
    Post, Put,
    Request,
    UseGuards,
    
  } from '@nestjs/common';
import ScheduleService from '../../service/schedule/schedule.service'
import JwtGuard from '../../../auth/guard/jwt.guard';
import { ScheduleDTO, ScheduleVerifiedDto } from '../../../schedule/dto/ScheduleDto'
import { ObjectId } from 'mongoose';
// import console from 'console';
  
  @Controller('schedule')
  export default class ScheduleController {
    constructor(private readonly scheduleService: ScheduleService) {}
  
    @Post('/create')
    @UseGuards(JwtGuard)
    async createSchedule(@Body() dto: ScheduleVerifiedDto, @Request() req) {
    
      const count = dto.count;

      const countWeek = dto.countInWeek;
    
      const week = ['07','05','02']

      for(let i = 0; i <= count; i+=week.length ) {
      
      week.map( weeks => {const week_day = weeks;  this.scheduleService.addSchedule(req.user._id, req.user.username, req.user.avatar, dto, week_day) })

      }
     //  return reqs
         }
  
    @Get(':id')
    async findById(@Param('id') id: ObjectId) {
      return this.scheduleService.findById(id);
    }

    @Get('week_day/:day')
    async findeByWeekDay(@Param('day') day: string) {
      return this.scheduleService.findeByWeekDay(day);
    }


    @Post('invite/:id/:scheduleID')
   async invite(@Param('id') id: ObjectId, @Param('scheduleID') scheduleID: ObjectId) 
   {
     return this.scheduleService.inviteStudents(id, scheduleID);
   }
   

   
   @Delete(':id')
    @UseGuards(JwtGuard)
    async deleteSchedule(@Request() req, @Param('id') scheduleId: ObjectId) {
      return this.scheduleService.deleteSchedule(scheduleId, req.user._id);
    }
  
    @Put(':id')
    @UseGuards(JwtGuard)
    async changeSchedule(
      @Request() req,
      @Param('id') scheduleId: ObjectId,
      @Body() dto: ScheduleDTO,
    ) {
      return this.scheduleService.changeSchedule(req.user._id, scheduleId, dto);
    }
  }
  