      import {
    Body,
    Controller, Delete,
    Get,
    Param,
    Post, Put,
    Request,
    UseGuards,
    
  } from '@nestjs/common';
import GroupService from '../../service/group/group.service'
import JwtGuard from '../../../auth/guard/jwt.guard';
import { GroupDTO, GroupVerifiedDto, GroupVerifiedInvite } from '../../../group/dto/GroupDto'
import { ObjectId } from 'mongoose';
import { group } from 'console';
  
  @Controller('group')
  export default class GroupController {
    constructor(private readonly groupService: GroupService) {}
  
    @Post('/create')
    @UseGuards(JwtGuard)
    async createGroup(@Body() dto: GroupVerifiedDto, @Request() req) {
      return this.groupService.addGroup(req.user._id, req.user.username, req.user.avatar, dto);
    }
  
    @Get(':id')
    async findById(@Param('id') id: ObjectId) {
      return this.groupService.findById(id);
    }

    


    @Post('invite/:id/:groupID')
   async invite(@Body('group_name') group_name: string, @Param('id') id: ObjectId, @Param('groupID') groupID: ObjectId) 
   {
     return this.groupService.inviteStudents(id, groupID, group_name);
   }
   

   
   @Delete(':id')
    @UseGuards(JwtGuard)
    async deleteGroup(@Request() req, @Param('id') groupId: ObjectId) {
      return this.groupService.deleteGroup(groupId, req.user._id);
    }
  
    @Put(':id')
    @UseGuards(JwtGuard)
    async changeGroup(
      @Request() req,
      @Param('id') groupId: ObjectId,
      @Body() dto: GroupDTO,
    ) {
      return this.groupService.changeGroup(req.user._id, groupId, dto);
    }
  }
  