import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenExpiredError } from 'jsonwebtoken';
import { CtError } from '@src/common/error/ct-error';
import { CtErrorType } from '@src/common/error/ct-error-type';
import { TokenService } from '@src/modules/auth/token/token.service';

@Injectable()
export class RefreshTokenService extends TokenService {
  private readonly expired = 60 * 60 * 24 * 14;
  constructor(jwtService: JwtService) {
    super(jwtService);
  }

  getExpired(): number {
    return this.expired;
  }
}
