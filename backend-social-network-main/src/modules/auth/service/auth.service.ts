import { Injectable } from '@nestjs/common';
import UserRepository from '../../user/service/user.repository';
import CryptoService from './crypto.service';
import { UserLoginDto, UserRegisterDto, UserVerifiedRegisterDto } from '../../user/dto/UserDto';
import { User } from '../../user/schema/User';
import { JwtService } from '@nestjs/jwt';

export type SecureUser = Pick<
  User,
  | 'email'
  | 'username'
  | 'full_name'
  | 'desc'
  | 'avatar'
  | 'photos'
  | 'country'
  | 'state'
  | 'registredIn'
  | 'verify'
  | 'confirmed'
  | 'online'
  | 'role'
  | 'website'
  | 'friends'
  | 'subscribers'
  | 'subscriptions'
  | 'posts'
  | 'reposts'
  | 'comments'
  | 'postComments'
>;

export type GeneratedToken<U> = {
  access_token: string;
  user: string;
};

@Injectable()
export default class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly cryptoService: CryptoService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(dto: UserLoginDto): Promise<SecureUser | null> {
    const candidate: User = await this.userRepository.findByUsername(
      dto.username,
    );
    if (!candidate) {
      return null;
    }

    const decryptedPassword = this.cryptoService.decrypt(candidate.password);
    if (candidate && decryptedPassword === dto.password) {
      const { password, ...secureUser } = candidate;
      return secureUser;
    }

    return null;
  }

  async generateToken(user): Promise<GeneratedToken<any>> {
    const { password, ...payload } = user._doc;
    const token = await this.jwtService.signAsync({ user: payload });
    return {
      access_token: token,
      user: payload,

    };

  }

  async  register(user: UserVerifiedRegisterDto): Promise<User | void> {
    const candidate: User = await this.userRepository.findByUsername(
      user.username,
    );
    if (candidate) {
      throw new Error('abgarik error');
    }
    const registredIn = new Date();

    // const encryptedPassword = this.cryptoService.encrypt(user.password);
    return this.userRepository.create({
      ...user,
      // password: encryptedPassword,
      registredIn,
    });
  }
}
