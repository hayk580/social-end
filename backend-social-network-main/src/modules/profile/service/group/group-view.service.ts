import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import GetGroupRepository from '../../../group/service/utils/get-group.repository';

@Injectable()
export default class GroupViewService {
  constructor(private readonly getGroupRepository: GetGroupRepository) {}

  async getAllGroups() {
    return this.getGroupRepository.getAllGroups();
  }

  async getGroupById(id){
    return this.getGroupRepository.getAllGroupsById(id);
  }

  async getSubGroups(subscriptions) {
    return this.getGroupRepository.getSubGroups(subscriptions);
  }
}
