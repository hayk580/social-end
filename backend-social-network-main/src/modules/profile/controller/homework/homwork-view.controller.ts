import {Controller, Get, UseGuards, MessageEvent, Request,  Res, Sse} from '@nestjs/common';
import HomeworkViewService from '../../service/homework/homework-view.service';
import JwtGuard from '../../../auth/guard/jwt.guard';
import { interval, Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Response } from 'express';
import { readFileSync } from 'fs';
import { join } from 'path';
@Controller('gethomeworks')
export default class HomeworkViewController {
    constructor(private readonly homeworkViewService: HomeworkViewService) {
    }

    @Get()
    index(@Res() response: Response) {
      response
        .type('text/html')
        .send(readFileSync(join(__dirname, 'index.html')).toString());
    }
    
    @Get('all')
    @UseGuards(JwtGuard)
    async getAllHomeworks() {
        return this.homeworkViewService.getAllHomeworks();
    }


  

    @Get('sub')
    @UseGuards(JwtGuard)
    async getSubHomeworks(@Request() req) {
        console.log(req.user)
        return this.homeworkViewService.getSubHomeworks(req.user.subscriptions);
    }
}
