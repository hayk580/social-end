import {Controller, Get, UseGuards, Request, Param} from '@nestjs/common';

import CourseViewService from '../../service/course/course-view.service'
import JwtGuard from '../../../auth/guard/jwt.guard';

@Controller('getcourses')
export default class CourseViewController {
    constructor(private readonly courseViewService: CourseViewService) {
    }

    @Get('all')
    // @UseGuards(JwtGuard)
    async getAllCourses() {
        return this.courseViewService.getAllCourses();
    }



    @Get('sub')
    @UseGuards(JwtGuard)
    async getSubCourses(@Request() req) {
        console.log(req.user)
        return this.courseViewService.getSubCourses(req.user.subscriptions);
    }



    @Get('course_modules/:id')
    async getCourseModules(@Param('id') id: string)
    {
        return this.courseViewService.getCourseModule(id)
    }
}
