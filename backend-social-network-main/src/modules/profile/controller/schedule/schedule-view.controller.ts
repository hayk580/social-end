import {Controller, Get, UseGuards, Request, Param} from '@nestjs/common';
import ScheduleViewService from '../../service/schedule/schedule-view.service'

import JwtGuard from '../../../auth/guard/jwt.guard';
import { ObjectId } from 'mongoose';

@Controller('getschedules')
export default class ScheduleViewController {
    constructor(private readonly scheduleViewService: ScheduleViewService) {
    }

    @Get('all')
    @UseGuards(JwtGuard)
    async getAllSchedules() {
        return this.scheduleViewService.getAllSchedules();
    }


    @Get('single/:id')
    @UseGuards(JwtGuard)
        async getScheduleByid(@Param('id') id: ObjectId) {
            return this.scheduleViewService.getSchedule(id);
        }


    @Get('course/:id') 
    @UseGuards(JwtGuard)
    async getScheduleBYCourseId(@Param('id') id: ObjectId){
       return this.scheduleViewService.getScheduleByCourse(id)  

    }




    @Get('sub')
    @UseGuards(JwtGuard)
    async getSubSchedules(@Request() req) {
        console.log(req.user)
        return this.scheduleViewService.getSubSchedules(req.user.subscriptions);
    }

   
}
