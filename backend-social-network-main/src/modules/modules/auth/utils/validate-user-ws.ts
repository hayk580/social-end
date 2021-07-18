import { UserDocument } from './../../user/entities/user.entity';
import { Logger } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { AuthService } from '../auth.service';
import { jwtConstants } from '../constants';
import { parse, extract } from 'query-string';

export async function validateUserWS(
  request: any,
  authService: AuthService,
  logger: Logger,
): Promise<Partial<UserDocument> | undefined> {
  console.log(request.headers.authorization);
  try {
    const user = getUserFromWSToken(request);
    return await authService.validateByUsername(user.username);
  } catch (error) {
    const isTokenExpired = error instanceof jwt.TokenExpiredError;
    if (isTokenExpired) logger.warn('Expired token for websockets');
    logger.error('Error on validate token');
    return undefined;
  }
}

export function getUserFromToken(request) {
  const authHeader = request.headers.authorization;
  const authToken = authHeader.replace('Bearer', '').trim();
  const user: Partial<UserDocument> = jwt.verify(
    authToken,
    jwtConstants.secret,
  ) as Partial<UserDocument>;
  return user;
}

export function getUserFromWSToken(request) {
  const token = parse(extract(request.url))?.authorization as string;
  const authToken = token.replace('Bearer', '').trim();
  const user: Partial<UserDocument> = jwt.verify(
    authToken,
    jwtConstants.secret,
  ) as Partial<UserDocument>;
  return user;
}
