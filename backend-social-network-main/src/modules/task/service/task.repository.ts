import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument } from '../schema/Task';
import { Model, ObjectId } from 'mongoose';
import UserRepository from '../../user/service/user.repository';
import { User, UserDocument } from '../../user/schema/User';

@Injectable()
export default class TaskRepository {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<TaskDocument>,
    private readonly userRepository: UserRepository,
  ) {}

  async create(dto, authorId: ObjectId | User) {
    const userProfile = await this.userRepository.findById(authorId);
    if (!userProfile) {
      return { message: 'Author not found' };
    }

    const newTask: TaskDocument = await this.taskModel.create({ ...dto });

    const updUserProfile = await this.userRepository.update(authorId, {
      tasks: [...userProfile.tasks, newTask._id],
    });
    return newTask;
  }


  async invite(id: ObjectId, taskID: ObjectId, task_name: string)
  {  

   const userProfile = await this.userRepository.findById(id)

    const updUserProfile = await this.userRepository.update(id,{
      tasks: [...userProfile.tasks, taskID],
      tasks_name: task_name 
    });
     
     return updUserProfile
  } 


  // async addStudents(id:ObjectId, dto, authorId: ObjectId | User)
  // {
  //   const userProfile = await this.userRepository.findById(authorId);
  //   const  task = await this.findById(id);
  //   if(!task)
  //   {
  //     return { message: 'task not found' };
  //   }
  //   if(!userProfile)
  //   {
  //     return { message: 'Author not found' };
  //   }
  
  //   const updTaskStudents = await this.taskModel.findByIdAndUpdate({ _id: id}, students:]  )
  
  // }

  async update(id: ObjectId | Task, dto) {
    const candidate = await this.findById(id);
    if (!candidate) {
      return { message: 'task not found' };
    }

    return this.taskModel.findByIdAndUpdate({ _id: id }, { ...dto });
  }

  async delete(id: ObjectId, authorId: ObjectId) {
    const candidate: TaskDocument = await this.findById(id);
    const userCandidate: UserDocument = await this.userRepository.findById(
      authorId,
    );
    let continues = false;

    if (!candidate) {
      return { message: 'task not found' };
    }
    if (!userCandidate) {
      return { message: 'user not found' };
    }

    if (String(candidate.authorId) !== String(authorId)) {
      return { message: 'author permission error' };
    }

    userCandidate.tasks.forEach((task) => {
      if (String(task) === String(id)) {
        continues = true;
      }
    });

    const filteredTasks = userCandidate.tasks.filter(
      (task) => String(task) !== String(id),
    );
    if (continues) {
      const updUserCandidate = await this.userRepository.update(authorId, {
        tasks: filteredTasks,
      });

      return this.taskModel.findByIdAndDelete({ _id: id });
    }
    return { message: 'task not found' };
  }

  async findById(id: ObjectId | Task) {
    const candidate = await this.taskModel.findById(id);
    console.log(candidate);
    return candidate;
  }
}
