import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Question, QuestionSchema } from './schema/Question';
import QuestionRepository from './service/question.repository';
import UserModule from '../user/user.module';
import GetQuestionRepository from './service/utils/get-question.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Question.name, schema: QuestionSchema }]),
    forwardRef(() => UserModule),
  ],
  providers: [QuestionRepository, GetQuestionRepository],
  controllers: [],
  exports: [QuestionRepository, GetQuestionRepository],
})
export default class QuestionModule {}
