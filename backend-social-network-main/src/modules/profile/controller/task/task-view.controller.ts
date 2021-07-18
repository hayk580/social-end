import {Controller, Get, UseGuards, Request, Param} from '@nestjs/common';

import TaskViewService from '../../service/task/task-view.service'
import JwtGuard from '../../../auth/guard/jwt.guard';
import { ObjectId } from 'mongoose';

@Controller('gettasks')
export default class TaskViewController {
    constructor(private readonly taskViewService: TaskViewService) {
    }

    @Get('all')
    @UseGuards(JwtGuard)
    async getAllTasks() {
        return this.taskViewService.getAllTasks();
    }




    @Get('singl/:id')
    @UseGuards(JwtGuard)
    async getTaskById(@Param('id') id: ObjectId ){
        return this.taskViewService.getTaskById(id)
    }



    @Get('sub')
    @UseGuards(JwtGuard)
    async getSubTasks(@Request() req) {
        console.log(req.user)
        return this.taskViewService.getSubTasks(req.user.subscriptions);
    }



    
}
