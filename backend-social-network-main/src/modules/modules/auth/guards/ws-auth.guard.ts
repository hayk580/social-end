import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WsAuthGuard extends AuthGuard('ws-auth-strategy') {}
