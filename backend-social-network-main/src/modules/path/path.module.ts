import { forwardRef, Module } from '@nestjs/common';
import { Path, PathSchema } from './schema/Path';
import PostRepository from './service/utils/post.repository';
import UserModule from '../user/user.module';
import GetPathRepository from './service/utils/get-path.repository';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Path.name, schema: PathSchema }]),
    forwardRef(() => UserModule),
  ],
  providers: [PostRepository, GetPathRepository],
  controllers: [],
  exports: [PostRepository, GetPathRepository],
})
export default class PathModule {}
