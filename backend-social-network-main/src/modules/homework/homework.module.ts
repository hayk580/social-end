import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Homework, HomeworkSchema } from './schema/Homework';
import HomeworkRepository from './service/homework.repository';
import UserModule from '../user/user.module';
import GetHomeworkRepository from './service/utils/get-homework.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Homework.name, schema: HomeworkSchema }]),
    forwardRef(() => UserModule),
  ],
  providers: [HomeworkRepository, GetHomeworkRepository],
  controllers: [],
  exports: [HomeworkRepository, GetHomeworkRepository],
})
export default class HomeworkModule {}
