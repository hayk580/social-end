import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Quizizz, QuizizzSchema } from './schema/Quizizz';
import QuizizzRepository from './service/quizizz.repository';
import UserModule from '../user/user.module';
import GetQuizizzRepository from './service/utils/get-quizizz.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Quizizz.name, schema: QuizizzSchema }]),
    forwardRef(() => UserModule),
  ],
  providers: [QuizizzRepository, GetQuizizzRepository],
  controllers: [],
  exports: [QuizizzRepository, GetQuizizzRepository],
})
export default class QuizizzModule {}
