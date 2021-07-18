import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { TaskDTO, TaskVerifiedInvite } from '../../../task/dto/TaskDto'
import TaskRepository from '../../../task/service/task.repository';
import { Task } from '../../../task/schema/Task';
import { from } from 'rxjs';

@Injectable()
export default class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async addTask(authorId: ObjectId, username: string, avatar: string,  dto: TaskDTO) {
    return this.taskRepository.create(
      {
        ...dto,
        authorId,
        username,
        avatar,
        createdIn: new Date(),
      },
      authorId,
    );
  }

  async findById(taskId: ObjectId): Promise<Task> {
    return this.taskRepository.findById(taskId);
  }


  async inviteStudents(id: ObjectId, taskID: ObjectId, task_name: string){
 
     return this.taskRepository.invite(id, taskID, task_name)
    
 }




  async changeTask(authorId: ObjectId, taskId: ObjectId, dto: TaskDTO) {
    return this.taskRepository.update(taskId, dto);
  }

  async deleteTask(taskId: ObjectId, authorId: ObjectId) {
    return this.taskRepository.delete(taskId, authorId);
  }
}
