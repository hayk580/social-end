import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Course_module, Course_moduleSchema } from './schema/Course_module';
import Course_moduleRepository from './service/course_module.repository';
import UserModule from '../user/user.module';
import GetCourse_moduleRepository from './service/utils/get-course_module.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Course_module.name, schema: Course_moduleSchema }]),
    forwardRef(() => UserModule),
  ],
  providers: [Course_moduleRepository, GetCourse_moduleRepository],
  controllers: [],
  exports: [Course_moduleRepository, GetCourse_moduleRepository],
})
export default class Course_moduleModule {}
