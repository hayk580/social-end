import {Controller, Get, UseGuards, Request, Param} from '@nestjs/common';

import GroupViewService from '../../service/group/group-view.service'
import JwtGuard from '../../../auth/guard/jwt.guard';
import { ObjectId } from 'mongoose';

@Controller('getgroups')
export default class GroupViewController {
    constructor(private readonly groupViewService: GroupViewService) {
    }

    @Get('all')
    @UseGuards(JwtGuard)
    async getAllGroups() {
        return this.groupViewService.getAllGroups();
    }




    @Get('singl/:id')
    @UseGuards(JwtGuard)
    async getGroupById(@Param('id') id: ObjectId ){
        return this.groupViewService.getGroupById(id)
    }



    @Get('sub')
    @UseGuards(JwtGuard)
    async getSubGroups(@Request() req) {
        console.log(req.user)
        return this.groupViewService.getSubGroups(req.user.subscriptions);
    }



    
}
