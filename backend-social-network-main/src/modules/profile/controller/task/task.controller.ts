      import {
    Body,
    Controller, Delete,
    Get,
    Param,
    Post, Put,
    Request,
    UseGuards,
    
  } from '@nestjs/common';
import TaskService from '../../service/task/task.service'
import JwtGuard from '../../../auth/guard/jwt.guard';
import { TaskDTO, TaskVerifiedDto, TaskVerifiedInvite } from '../../../task/dto/TaskDto'
import { ObjectId } from 'mongoose';
  
  @Controller('task')
  export default class TaskController {
    constructor(private readonly taskService: TaskService) {}
  
    @Post('/create')
    @UseGuards(JwtGuard)
    async createTask(@Body() dto: TaskVerifiedDto, @Request() req) {
      return this.taskService.addTask(req.user._id, req.user.username, req.user.avatar, dto);
    }
  
    @Get(':id')
    async findById(@Param('id') id: ObjectId) {
      return this.taskService.findById(id);
    }

    


    @Post('invite/:id/:taskID')
   async invite(@Body('task_name') task_name: string, @Param('id') id: ObjectId, @Param('taskID') taskID: ObjectId) 
   {
     return this.taskService.inviteStudents(id, taskID, task_name);
   }
   

   
   @Delete(':id')
    @UseGuards(JwtGuard)
    async deleteTask(@Request() req, @Param('id') taskId: ObjectId) {
      return this.taskService.deleteTask(taskId, req.user._id);
    }
  
    @Put(':id')
    @UseGuards(JwtGuard)
    async changeTask(
      @Request() req,
      @Param('id') taskId: ObjectId,
      @Body() dto: TaskDTO,
    ) {
      return this.taskService.changeTask(req.user._id, taskId, dto);
    }
  }
  