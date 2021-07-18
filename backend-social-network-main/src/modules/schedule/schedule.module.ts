import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Schedule, ScheduleSchema } from './schema/Schedule';
import ScheduleRepository from './service/schedule.repository';
import UserModule from '../user/user.module';
import GetScheduleRepository from './service/utils/get-schedule.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Schedule.name, schema: ScheduleSchema }]),
    forwardRef(() => UserModule),
  ],
  providers: [ScheduleRepository, GetScheduleRepository],
  controllers: [],
  exports: [ScheduleRepository, GetScheduleRepository],
})
export default class ScheduleModule {}
