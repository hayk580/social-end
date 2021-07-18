import { Injectable } from '@nestjs/common';
import { User, UserDocument } from '../schema/User';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { UserDto } from '../dto/UserDto';
import { start } from 'repl';

export type UserOrMessage = User | { message: string };
export type AdvancedRepositoryType<M> = {
  errors: boolean;
  message: M;
};

@Injectable()
export default class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async findByUsername(username: string): Promise<User> {
    return this.userModel.findOne({ username });
  }

  async findById(id: ObjectId | User) {
    const candidate = await this.userModel.findById(id);
    console.log(candidate);
    return candidate;
  }

 

async findeSub(id: any) {
  const sub = await this.userModel.find({ subscribers : id })
   console.log(sub)
   return sub
}

async findBygroup(id){

  const userInGroup = await this.userModel.find({ groups: id })

  return userInGroup
 
}


async getUserByNotInGroup(id: any){

  const userInGroup = await this.userModel.find({ groups:{$ne: id} })

  return userInGroup
 
}

async getUserById(id: ObjectId){

 return  await this.userModel.findById(id)

 
}




  async create(dto: UserDto): Promise<User> {
    return this.userModel.create({ ...dto });
  }

  async update(id: ObjectId | User, updatedValue: any): Promise<User> {
    return this.userModel.findByIdAndUpdate({ _id: id }, updatedValue);
  }

  async setOnline(id: ObjectId, value: boolean) {
    return this.userModel.findByIdAndUpdate(id, { online: value });
  }
}
