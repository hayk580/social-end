import { Injectable } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions/unauthorized.exception';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { jwtRefreshConstants } from '../constants';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtRefreshConstants.secret, // gets secret from environment variables
    });
  }

  async validate(payload: { username: string; id: string }): Promise<any> {
    const { username } = payload;
    const user = await this.authService.validateByUsername(username);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
