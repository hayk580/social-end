import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Group, GroupSchema } from './schema/Group';
import GroupRepository from './service/group.repository';
import UserModule from '../user/user.module';
import GetGroupRepository from './service/utils/get-group.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Group.name, schema: GroupSchema }]),
    forwardRef(() => UserModule),
  ],
  providers: [GroupRepository, GetGroupRepository],
  controllers: [],
  exports: [GroupRepository, GetGroupRepository],
})
export default class GroupModule {}
