import { Injectable } from '@nestjs/common';
import { UserDto } from '../../user/dto/UserDto';
import PhotosRepository from '../../user/service/utils/photos.repository';
import FileService from '../../file/file.service';

@Injectable()
export default class PhotosService {
  constructor(
    private readonly photosRepository: PhotosRepository,
    private readonly fileService: FileService,
  ) {}

  async setAvatar(candidate: UserDto, file) {
    // if (candidate.avatar.length > 0) {
    //   this.fileService.deleteFile(
    //     candidate.username,
    //     'avatar',
    //     candidate.avatar,
    //   );
    // }

    const avatar = this.fileService.createFile(
      // candidate.username,
      'avatar',
      file,
    );
    console.log(avatar);
    return this.photosRepository.setAvatar(candidate._id, avatar);
  }



  async setCover(candidate: UserDto, file) {
 

    const cover = this.fileService.createFile(
      // candidate.username,
      'cover',
      file,
    );
    console.log(cover);
    return this.photosRepository.setCover(candidate._id, cover);
  }









  async removeAvatar(candidate: UserDto) {
    if (candidate.avatar.length > 0) {
      this.fileService.deleteFile(
        // candidate.username,
        'avatar',
        candidate.avatar,
      );
    }
    return this.photosRepository.removeAvatar(candidate._id);
  }

  async addPhoto(candidate: UserDto, file) {
    const photo = this.fileService.createFile(
      'photo',
      file,
    );
   this.photosRepository.addPhoto(candidate._id, photo);
   return photo
  }

  async removePhoto(candidate: UserDto, fileName) {
    const photo = this.fileService.deleteFile(
     
      'photo',
      fileName,
    );
    return this.photosRepository.removePhoto(candidate._id, photo);
  }
}