import { CreateUserDto } from './../user/dto/create-user.dto';
import { AuthService, TokenUser } from './auth.service';
import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RegisterUserValidationPipe } from './pipes/register-user.pipe';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register-login')
  async registerAndLogin(
    @Body(RegisterUserValidationPipe) newUser: CreateUserDto,
  ): Promise<TokenUser> {
    try {
      return await this.authService.registerAndLogin(newUser);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException({ message: 'Server error' });
    }
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: any): Promise<TokenUser> {
    return this.authService.login(req.user);
  }

  @Post('refresh-token')
  async refreshToken(
    @Body() req: { refreshToken: string },
  ): Promise<TokenUser> {
    return await this.authService.refreshAccessToken(req.refreshToken);
  }
}
