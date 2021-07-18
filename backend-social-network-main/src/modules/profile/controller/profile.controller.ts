import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import JwtGuard from '../../auth/guard/jwt.guard';
import ProfileService from '../service/profile.service';
import { UserVerifiedUpdateDto, UserDto } from '../../user/dto/UserDto';

import AdminService from 'src/modules/admin/service/admin.service';
import { ObjectId } from 'mongoose';

@Controller('profile')
export default class ProfileController {
  constructor(private readonly profileService: ProfileService,
    private readonly adminService: AdminService
    ) {}

  @Get('my')
  @UseGuards(JwtGuard)
  async myProfile(@Request() req) {
    return this.profileService.myProfile(req.user._id);
  }

  @Get('sl/:user_id')
  @UseGuards(JwtGuard)
  async findById(@Param('user_id') user_id: string) {
    return this.profileService.findSubByID(user_id)
  }


   @Get('group/:id')
   @UseGuards(JwtGuard)
   async getUserByGroup(@Param('id') id: ObjectId){
     return this.profileService.findUserByGroup(id)
   }

   @Get('NotIngroup/:id')
   @UseGuards(JwtGuard)
   async getUserByNotInGroup(@Param('id') id: ObjectId){
     return this.profileService.getUserByNotInGroup(id)
   }

  @Get('set/:id')
  @UseGuards(JwtGuard)
  async setUpdatedDataToReq(@Param('id') id: any, @Request() req) {
      return await this.profileService.findeSub(id);

  }

  @Get(':username')
  async getProfile(@Param('username') username: string) {
    return this.profileService.getProfile(username);
  }

  @Get('userById/:id')
  async getUserDataById(@Param('id') id: ObjectId){
    return this.profileService.getUserById(id)
  }



  @Put()
  @UseGuards(JwtGuard)
  async update(@Body() dto: UserVerifiedUpdateDto, @Request() req) {
    return this.profileService.update(req.user._id, dto);
  }


  
}
