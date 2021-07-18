import { Injectable } from '@nestjs/common';
import FileService from '../../file/file.service';
import UserRepository from '../../user/service/user.repository';
import { ObjectId } from 'mongoose';
import { UserDto, UserVerifiedUpdateDto } from '../../user/dto/UserDto';

@Injectable()
export default class ProfileService {
  constructor(
    private readonly fileService: FileService,
    private readonly userRepository: UserRepository,
  ) {}

  async myProfile(id: ObjectId) {
    const candidate = await this.userRepository.findById(id);
    if (!candidate) {
      return { message: 'User not found' };
    }
    return candidate;
  }

  async getProfile(username: string) {
    const candidate = await this.userRepository.findByUsername(username);
    if (!candidate) {
      return { message: 'user not found' };
    }
    return candidate;
  }

  async setOnline(id: ObjectId, value: boolean) {
    return this.userRepository.setOnline(id, value);
  }

  async update(id: ObjectId, dto: UserVerifiedUpdateDto) {
    return this.userRepository.update(id, dto);
  }

  async findById(id: ObjectId) {
    return this.userRepository.findById(id);
  }
  async getUserById(id: ObjectId){
    return this.userRepository.getUserById(id)
  }

  async findeSub(id) {

    return this.userRepository.findeSub(id)

  }
 

  async findUserByGroup(id: ObjectId) {
    return this.userRepository.findBygroup(id)
  }
  

  async getUserByNotInGroup(id: ObjectId) {
    return this.userRepository.getUserByNotInGroup(id)
  }

async findSubByID(user_id)
{
  return this.userRepository.findeSub(user_id);
}





}
