import {Controller, Get, UseGuards, Request, Param} from '@nestjs/common';

import QuestionViewService from '../../service/question/question-view.service'
import JwtGuard from '../../../auth/guard/jwt.guard';
import { ObjectId } from 'mongoose';

@Controller('getquestions')
export default class QuestionViewController {
    constructor(private readonly questionViewService: QuestionViewService) {
    }

    @Get('all')
    @UseGuards(JwtGuard)
    async getAllQuestions() {
        return this.questionViewService.getAllQuestions();
    }




    @Get('singl/:id')
    @UseGuards(JwtGuard)
    async getQuestionById(@Param('id') id: ObjectId ){
        return this.questionViewService.getQuestionById(id)
    }



    @Get('sub')
    @UseGuards(JwtGuard)
    async getSubQuestions(@Request() req) {
        console.log(req.user)
        return this.questionViewService.getSubQuestions(req.user.subscriptions);
    }



    
}
