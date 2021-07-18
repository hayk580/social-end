import { Module } from '@nestjs/common';
import ProfileService from './service/profile.service';
import ProfileController from './controller/profile.controller';
import FileModule from '../file/file.module';
import UserModule from '../user/user.module';
import AuthModule from '../auth/auth.module';
import SubscribeService from './service/subscribe.service';
import PhotosService from './service/photos.service';
import SubscribeController from './controller/subscribe.controller';
import {
  AvatarController,
  CoverController,
  PhotosController,
} from './controller/photos.controller';
import PostModule from '../post/post.module';
import PostController from './controller/post/post.controller';
import PathController from './controller/path/path.controller';
import PostService from './service/post/post.service';
import PathService from './service/path/path.service';
import CommentModule from '../comment/comment.module';
import UserCommentController from './controller/user-comment.controller';
import PostCommentController from './controller/post/post-comment.controller';
import UserCommentService from './service/user-comment.service';
import PostCommentService from './service/post/post-comment.service';
import RepostsService from './service/post/reposts.service';
import RepostController from './controller/post/repost.controller';
import PostViewService from './service/post/post-view.service';
import PostViewController from './controller/post/post-view.controller';
import AdminService from '../admin/service/admin.service';
import AdminController from '../admin/controller/admin.controller';
import HomeworkController from './controller/homework/homework.controller'
import HomeworkViewController from './controller/homework/homwork-view.controller';
import HomeworkService from './service/homework/homework.service';
import HomeworkModule from '../homework/homework.module';
import HomeworkViewService from './service/homework/homework-view.service';
import GroupService from './service/group/group.service';
import GroupController from './controller/group/group.controller';
import GroupViewController from './controller/group/group-view.controller';
import GroupViewService from './service/group/group-view.service';
import GroupModule from '../group/group.module';
import ScheduleService from './service/schedule/schedule.service';
import ScheduleController from './controller/schedule/schedule.controller';
import ScheduleModule from '../schedule/schedule.module';
import CourseModule from '../course/course.module'
import CourseService from './service/course/course.service';
import CourseController from './controller/course/course.controller';
import ScheduleViewService from './service/schedule/schedule-view.service';
import ScheduleViewController from './controller/schedule/schedule-view.controller';
import CourseViewController from './controller/course/course-view.controller';
import CourseViewService from './service/course/course-view.service';
import HomeworkCommentService from './service/homework/homework-comment.service';
import HomeworkCommentController from './controller/homework/homework-comment.controller';
import Course_moduleViewService from './service/course_module/course_module-view.service';
import Course_moduleService from './service/course_module/course_module.service'
import Course_moduleController from './controller/course_module/course_module.controller'
import Course_moduleViewController from './controller/course_module/course_module-view.controller'
import Course_moduleModule from '../course_module/course.module';
import ReplyCommentService from './service/post/reply-comment.service';
import ReplyCommentController from './controller/post/reply-comment.controller';
import QuestionModule from '../question/question.module';
import QuestionService from './service/question/question.service';
import QuestionViewService from './service/question/question-view.service';
import QuestionViewController from './controller/question/question-view.controller';
import QuestionController from './controller/question/question.controller';
import { Category } from '../category/schema/Category';
import CategoryService from './service/category/category.service';
import CategoryViewService from './service/category/category-view.service';
import CategoryController from './controller/category/category.controller';
import CategoryViewController from './controller/category/category-view.controller';
import CategoryModule from '../category/question.module';
import TaskViewService from './service/task/task-view.service';
import TaskService from './service/task/task.service';
import TaskController from './controller/task/task.controller';
import TaskViewController from './controller/task/task-view.controller';
import TaskModule from '../task/task.module';

@Module({
  imports: [
    FileModule,
    UserModule,
    AuthModule, 
    PostModule, 
    CommentModule, 
    HomeworkModule, 
    GroupModule, 
    ScheduleModule, 
    CourseModule, 
    Course_moduleModule, 
    QuestionModule, 
    CategoryModule,
    TaskModule
  ],
  providers: [
    ProfileService,
    SubscribeService,
    PhotosService,
    PostService,
    UserCommentService,
    PostCommentService,
    HomeworkCommentService,
    RepostsService,
    PathService,
    PostViewService,
    HomeworkViewService,
    AdminService,
    HomeworkService,
    GroupService,
    ScheduleService,
    CourseService,
    ScheduleViewService,
    CourseViewService,
    GroupViewService,
    Course_moduleViewService,
    Course_moduleService,
    ReplyCommentService, 
    QuestionService,
    QuestionViewService,
    CategoryService,
    CategoryViewService,
    TaskViewService,
    TaskService
 
    

  ],
  controllers: [
    ProfileController,
    SubscribeController,
    PhotosController,
    AvatarController,
    CoverController,
    PostController,
    UserCommentController,
    PostCommentController,
    HomeworkCommentController,
    RepostController,
    PathController,
    AdminController,
    PostViewController,
    HomeworkController,
    HomeworkViewController,
    GroupController,
    GroupViewController,
    CourseController,
    ScheduleViewController,
    ScheduleController,
    CourseViewController,
    Course_moduleController,
    Course_moduleViewController,
    ReplyCommentController,
    QuestionViewController,
    QuestionController,
    CategoryController,
    CategoryViewController,
    TaskController,
    TaskViewController
  
  ],
})
export default class ProfileModule {}
