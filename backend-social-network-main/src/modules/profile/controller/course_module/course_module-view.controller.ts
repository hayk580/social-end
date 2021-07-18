import {Controller, Get, UseGuards, Request} from '@nestjs/common';

import Course_moduleViewService from '../../service/course_module/course_module-view.service'
import JwtGuard from '../../../auth/guard/jwt.guard';

@Controller('getcourse_modules')
export default class Course_moduleViewController {
    constructor(private readonly course_moduleViewService: Course_moduleViewService) {
    }

    @Get('all')
    @UseGuards(JwtGuard)
    async getAllCourse_modules() {
        return this.course_moduleViewService.getAllCourse_modules();
    }

    @Get('sub')
    @UseGuards(JwtGuard)
    async getSubCourse_modules(@Request() req) {
        console.log(req.user)
        return this.course_moduleViewService.getSubCourse_modules(req.user.subscriptions);
    }
}
