import {Controller, Get, UseGuards, Request, Param} from '@nestjs/common';
import PostViewService from '../../service/post/post-view.service';
import JwtGuard from '../../../auth/guard/jwt.guard';

@Controller('getposts')
export default class PostViewController {
    constructor(private readonly postViewService: PostViewService) {
    }

    @Get('all')
    @UseGuards(JwtGuard)
    async getAllPosts() {
        return this.postViewService.getAllPosts();
    }

    @Get('/postByUser/:id')
    @UseGuards(JwtGuard)
    async postByUser(@Param('id')  id: any) {
        return this.postViewService.postByUser(id);
    }


    @Get('sub')
    @UseGuards(JwtGuard)
    async getSubPosts(@Request() req) {
        console.log(req.user)
        return this.postViewService.getSubPosts(req.user.subscriptions);
    }

  

}
