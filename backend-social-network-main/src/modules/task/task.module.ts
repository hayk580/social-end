import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './schema/Task';
import TaskRepository from './service/task.repository';
import UserModule from '../user/user.module';
import GetTaskRepository from './service/utils/get-task.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    forwardRef(() => UserModule),
  ],
  providers: [TaskRepository, GetTaskRepository],
  controllers: [],
  exports: [TaskRepository, GetTaskRepository],
})
export default class TaskModule {}
