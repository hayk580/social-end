import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Group, GroupDocument } from '../schema/Group';
import { Model, ObjectId } from 'mongoose';
import UserRepository from '../../user/service/user.repository';
import { User, UserDocument } from '../../user/schema/User';

@Injectable()
export default class GroupRepository {
  constructor(
    @InjectModel(Group.name) private readonly groupModel: Model<GroupDocument>,
    private readonly userRepository: UserRepository,
  ) {}

  async create(dto, authorId: ObjectId | User) {
    const userProfile = await this.userRepository.findById(authorId);
    if (!userProfile) {
      return { message: 'Author not found' };
    }

    const newGroup: GroupDocument = await this.groupModel.create({ ...dto });

    const updUserProfile = await this.userRepository.update(authorId, {
      groups: [...userProfile.groups, newGroup._id],
    });
    return newGroup;
  }


  async invite(id: ObjectId, groupID: ObjectId, group_name: string)
  {  

   const userProfile = await this.userRepository.findById(id)

    const updUserProfile = await this.userRepository.update(id,{
      groups: [...userProfile.groups, groupID],
      groups_name: group_name 
    });
     
     return updUserProfile
  } 


  // async addStudents(id:ObjectId, dto, authorId: ObjectId | User)
  // {
  //   const userProfile = await this.userRepository.findById(authorId);
  //   const  group = await this.findById(id);
  //   if(!group)
  //   {
  //     return { message: 'group not found' };
  //   }
  //   if(!userProfile)
  //   {
  //     return { message: 'Author not found' };
  //   }
  
  //   const updGroupStudents = await this.groupModel.findByIdAndUpdate({ _id: id}, students:]  )
  
  // }

  async update(id: ObjectId | Group, dto) {
    const candidate = await this.findById(id);
    if (!candidate) {
      return { message: 'group not found' };
    }

    return this.groupModel.findByIdAndUpdate({ _id: id }, { ...dto });
  }

  async delete(id: ObjectId, authorId: ObjectId) {
    const candidate: GroupDocument = await this.findById(id);
    const userCandidate: UserDocument = await this.userRepository.findById(
      authorId,
    );
    let continues = false;

    if (!candidate) {
      return { message: 'group not found' };
    }
    if (!userCandidate) {
      return { message: 'user not found' };
    }

    if (String(candidate.authorId) !== String(authorId)) {
      return { message: 'author permission error' };
    }

    userCandidate.groups.forEach((group) => {
      if (String(group) === String(id)) {
        continues = true;
      }
    });

    const filteredGroups = userCandidate.groups.filter(
      (group) => String(group) !== String(id),
    );
    if (continues) {
      const updUserCandidate = await this.userRepository.update(authorId, {
        groups: filteredGroups,
      });

      return this.groupModel.findByIdAndDelete({ _id: id });
    }
    return { message: 'group not found' };
  }

  async findById(id: ObjectId | Group) {
    const candidate = await this.groupModel.findById(id);
    console.log(candidate);
    return candidate;
  }
}
