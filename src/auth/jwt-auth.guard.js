import { UnauthorizedException, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info) {
    if (!user) {
      throw new UnauthorizedException(`Invalid token: ${info.message}.`);
    }
    
    return user;
  }
}
