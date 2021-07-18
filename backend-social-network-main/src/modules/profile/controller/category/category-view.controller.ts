import {Controller, Get, UseGuards, Request, Param} from '@nestjs/common';

import CategoryViewService from '../../service/category/category-view.service'
import JwtGuard from '../../../auth/guard/jwt.guard';
import { ObjectId } from 'mongoose';

@Controller('getcategorys')
export default class CategoryViewController {
    constructor(private readonly categoryViewService: CategoryViewService) {
    }

    @Get('all')
    @UseGuards(JwtGuard)
    async getAllCategorys() {
        return this.categoryViewService.getAllCategorys();
    }




    @Get('singl/:id')
    @UseGuards(JwtGuard)
    async getCategoryById(@Param('id') id: ObjectId ){
        return this.categoryViewService.getCategoryById(id)
    }



    @Get('sub')
    @UseGuards(JwtGuard)
    async getSubCategorys(@Request() req) {
        console.log(req.user)
        return this.categoryViewService.getSubCategorys(req.user.subscriptions);
    }



    
}
