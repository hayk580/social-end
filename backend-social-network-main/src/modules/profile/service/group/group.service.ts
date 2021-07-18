import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { GroupDTO, GroupVerifiedInvite } from '../../../group/dto/GroupDto'
import GroupRepository from '../../../group/service/group.repository';
import { Group } from '../../../group/schema/Group';
import { from } from 'rxjs';

@Injectable()
export default class GroupService {
  constructor(private readonly groupRepository: GroupRepository) {}

  async addGroup(authorId: ObjectId, username: string, avatar: string,  dto: GroupDTO) {
    return this.groupRepository.create(
      {
        ...dto,
        authorId,
        username,
        avatar,
        createdIn: new Date(),
      },
      authorId,
    );
  }

  async findById(groupId: ObjectId): Promise<Group> {
    return this.groupRepository.findById(groupId);
  }


  async inviteStudents(id: ObjectId, groupID: ObjectId, group_name: string){
 
     return this.groupRepository.invite(id, groupID, group_name)
    
 }




  async changeGroup(authorId: ObjectId, groupId: ObjectId, dto: GroupDTO) {
    return this.groupRepository.update(groupId, dto);
  }

  async deleteGroup(groupId: ObjectId, authorId: ObjectId) {
    return this.groupRepository.delete(groupId, authorId);
  }
}
