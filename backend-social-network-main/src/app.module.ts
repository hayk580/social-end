import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
// import UserModule from './modules/user/user.module';
// import AuthModule from './modules/auth/auth.module';
import FileModule from './modules/file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import ProfileModule from './modules/profile/profile.module';
import AdminModule from './modules/admin/admin.module';
import CommentModule from './modules/comment/comment.module';
import HomeworkModule from './modules/homework/homework.module';
import GroupModule from './modules/group/group.module';
import ScheduleModule from './modules/schedule/schedule.module';
import CourseModule from './modules/course/course.module';
import Course_moduleModule from './modules/course_module/course.module';
import { EventsModule } from './modules/events/events.module';
import TaskModule from './modules/task/task.module';
import { NotificationModule } from './modules/notification/notification.module';
import { AuthModule } from './modules/modules/auth/auth.module';
import { MessageModule } from './modules//modules/message/message.module';
import { UserModule } from './modules//modules/user/user.module';
import { ChatModule } from './modules/modules/chat/chat.module';



const dbURI = 'mongodb://localhost/social-network';

@Module({
  imports: [
    MongooseModule.forRoot(dbURI),
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({ rootPath: path.resolve(__dirname,  'static') }),
    FileModule,
    AdminModule,
    CommentModule,
    HomeworkModule,
    GroupModule,
    ScheduleModule,
    CourseModule,
    ProfileModule,
    Course_moduleModule,
    EventsModule,
    TaskModule,
    NotificationModule,
    UserModule,
    MessageModule,
    AuthModule,
    ChatModule,

  ],
})
export class AppModule {}
