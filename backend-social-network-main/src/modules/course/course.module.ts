import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from './schema/Course';
import CourseRepository from './service/course.repository';
import UserModule from '../user/user.module';
import GetCourseRepository from './service/utils/get-course.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }]),
    forwardRef(() => UserModule),
  ],
  providers: [CourseRepository, GetCourseRepository],
  controllers: [],
  exports: [CourseRepository, GetCourseRepository],
})
export default class CourseModule {}
