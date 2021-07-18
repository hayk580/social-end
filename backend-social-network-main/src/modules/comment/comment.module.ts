import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostComment, PostCommentSchema } from './schema/PostComment';
import { UserComment, UserCommentSchema } from './schema/UserComment';
import UserCommentRepository from './service/user/user-comment.repository';
import PostCommentRepository from './service/post/post-comment.repository';
import UserModule from '../user/user.module';
import PostModule from '../post/post.module';
import HomeworkModule from '../homework/homework.module'
import HomworkCommentRepository from './service/homework/homework-comment.repository'
import { HomeworkComment, HomeworkCommentSchema } from './schema/HomeworkComment';
import { Replycomment, ReplycommentSchema } from './schema/Replycomment';
import ReplyCommentRepository from './service/post/replay-comment.repository';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PostComment.name, schema: PostCommentSchema },
    ]),
    MongooseModule.forFeature([
      { name: UserComment.name, schema: UserCommentSchema },
    ]),

    MongooseModule.forFeature([
      { name: HomeworkComment.name, schema: HomeworkCommentSchema },
    ]),
    MongooseModule.forFeature([
      {name: Replycomment.name, schema: ReplycommentSchema },
    ]),

    UserModule,
    PostModule,
    HomeworkModule,
    

  ],
  providers: [UserCommentRepository, PostCommentRepository, HomworkCommentRepository, ReplyCommentRepository],
  exports: [UserCommentRepository, PostCommentRepository, HomworkCommentRepository, ReplyCommentRepository],
})
export default class CommentModule {}
