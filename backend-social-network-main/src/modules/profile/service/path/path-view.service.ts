import { Injectable } from '@nestjs/common';
import GetPathRepository from '../../../path/service/utils/get-path.repository';

@Injectable()
export default class PathViewService {
  constructor(private readonly getPathRepository: GetPathRepository) {}

  async getAllPaths()
  {
    return this.getPathRepository.getAllPaths();
  }
}
