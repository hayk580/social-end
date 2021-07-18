import { UserDocument } from './../../user/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { AuthService } from '../auth.service';

@Injectable()
export class WsAuthStrategy {
  constructor(private authService: AuthService) {}

  async validate(payload: Partial<UserDocument>): Promise<any> {
    const { username } = payload;
    const user = await this.authService.validateByUsername(username);
    if (!user) {
      throw new WsException({ error: 'not authorized' });
    }
    return user;
  }
}
