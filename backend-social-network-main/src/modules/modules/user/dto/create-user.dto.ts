import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {

  username: string;
   
  email: string;

  password: string;

  firstname: string;

  lastname: string;

  gender: string;

  course: string;

  city: string;

  address: string;

  phone: string;

}
