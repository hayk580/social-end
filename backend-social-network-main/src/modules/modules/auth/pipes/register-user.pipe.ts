import { CreateUserDto } from './../../user/dto/create-user.dto';
import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';

@Injectable()
export class RegisterUserValidationPipe implements PipeTransform {
  constructor(private readonly authService: AuthService) {}

  async transform(
    newUser: CreateUserDto,
    metadata: ArgumentMetadata,
  ): Promise<CreateUserDto> {
    const userDto = plainToClass(CreateUserDto, newUser);
    const errors = await validate(userDto);
    const hasErrors = errors.length > 0;
    const logicErrors: Partial<Omit<CreateUserDto, 'password'>> = {};
    if (hasErrors)
      throw new BadRequestException({ message: 'Invalid data', errors });
    const existEmail = await this.authService.validateEmail(userDto.email);
    const existUsername = await this.authService.validateByUsername(
      userDto.username,
    );
    if (existEmail) {
      logicErrors.email = 'The email has been taken from another user';
    }
    if (existUsername) {
      logicErrors.username = 'The username has been taken from another user';
    }
    const hasLogicErrors = Object.keys(logicErrors).length;
    if (hasLogicErrors)
      throw new BadRequestException({
        statusCode: 400,
        error: true,
        errors: logicErrors,
      });
    return userDto;
  }
}
