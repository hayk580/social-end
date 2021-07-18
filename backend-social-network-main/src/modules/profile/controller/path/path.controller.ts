import {
  Body,
  Controller, Delete,
  Get,
  Param,
  Post, Put,
  Request,
  UseGuards,
} from '@nestjs/common';

import PathService from '../../service/path/path.service';
import JwtGuard from '../../../auth/guard/jwt.guard';
import { PathDto, PathVerifiedDto } from '../../../path/dto/pathDto';
import { ObjectId } from 'mongoose';
import { Role } from '../../../user/dto/UserDto';
import { hasRoles } from '../../../auth/decorator/roles.decorator';

@Controller('path')
export default class PathController
{
  constructor(private readonly pathService: PathService) {}

  @Post('insert')
  @hasRoles(Role.ADMIN)
  @UseGuards(JwtGuard)
  async createPost(@Body() dto: PathVerifiedDto, @Request() req) {
    return this.pathService.addPost(req.user._id, dto);
  }

  @Get(':id')
  async findById(@Param('id') id: ObjectId) {
    return this.pathService.findById(id);
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  async changePath(
    @Request() req,
    @Param('id') pathID: ObjectId,
    @Body() dto: PathDto,
  ) {
    return this.pathService.changePath(req.user._id, pathID, dto);
  }
}
