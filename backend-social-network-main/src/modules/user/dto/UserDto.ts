import { ObjectId } from 'mongoose';
import { IsOptional, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  MEDIA = 'MEDIA',
}

export type UserLoginDto = {

  username: string;
  password: string;
};

export type UserRegisterDto = {
  username: string;
  role?: Role;
  email: string;
  full_name: string;
  password: string;
};

export type UserRegisterByAdminDto = {
  email: string;
  username: string;
  ful_name: string;
}


export class UserVerifiedLoginDto {
  @ApiProperty()
  @MinLength(5, {
    message: 'min length 5',
  })

  @MaxLength(35, {
    message: 'max length 35',
  })
  @IsOptional()
  username?: string;
  @ApiProperty()

  @MinLength(5, {
    message: 'min length 5',
  })
  @MaxLength(25, {
    message: 'max length 25',
  })
  password: string;
  @ApiProperty()

  @MinLength(5, {
    message: 'emial min length 5',
  })
  @MaxLength(45, {
    message: 'email max length 45',
  })
  email: string;
  

}

export class UserVerifiedRegisterDto {

  @MinLength(5, {
    message: 'name min length 5',
  })
  @MaxLength(35, {
    message: 'name max length 35',
  })
  full_name: string;

  username: string;

  role: Role = Role.USER;
}

export class UserVerifiedUpdateDto {

  @MinLength(5, {
    message: 'name min length 5',
  })
  @MaxLength(35, {
    message: 'name max length 35',
  })
   phone:string;


  @MinLength(5, {
    message: 'name min length 5',
  })
  @MaxLength(35, {
    message: 'name max length 35',
  })
   occupation:string;

  @MinLength(5, {
    message: 'name min length 5',
  })
  @MaxLength(35, {
    message: 'name max length 35',
  })
   birthdate: string;

}

export type UserDto = {
  readonly _id?: ObjectId;
  readonly email?: string;
  readonly username?: string;
  readonly full_name?: string;
  readonly desc?: string;
  readonly password?: string;
  readonly avatar?: string;
  readonly photos?: string[];
  readonly country?: string;
  readonly state?: string;
  readonly registredIn?: Date;
  readonly verify?: boolean;
  readonly confirmed?: boolean;
  readonly online?: boolean;
  readonly group?: string;
  readonly role?: Role;
  readonly website?: string;
  readonly friends?: ObjectId[];
  readonly subscribers?: ObjectId[];
  readonly subscriptions?: ObjectId[];
  readonly posts?: string[];
  readonly reposts?: string[];
  readonly comments?: string[];
  readonly postComments?: string[];
  readonly phone?:string;
  readonly occupation?:string;
  readonly birthdate?: string;
  readonly skills?: string[];
  readonly gender?:  string;
  readonly address?:  string;
};
