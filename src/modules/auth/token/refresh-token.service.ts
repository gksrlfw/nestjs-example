import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenExpiredError } from 'jsonwebtoken';
import { CtError } from '@src/common/error/ct-error';
import { CtErrorType } from '@src/common/error/ct-error-type';
import { TokenService } from '@src/modules/auth/token/token.service';

@Injectable()
export class RefreshTokenService extends TokenService {
  constructor(jwtService: JwtService) {
    super(jwtService);
  }
}
