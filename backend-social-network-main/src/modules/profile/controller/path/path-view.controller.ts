import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import PathViewService from '../../service/path/path-view.service';
import JwtGuard from '../../../auth/guard/jwt.guard';

@Controller('getpaths')
export default class PathViewController {
  constructor(private readonly pathViewService: PathViewService) {}

  @Get('all')
  @UseGuards(JwtGuard)
  async getAllPaths() {
    return this.pathViewService.getAllPaths();
  }

}
