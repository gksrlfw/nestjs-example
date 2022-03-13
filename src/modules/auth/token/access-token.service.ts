import { TokenExpiredError } from 'jsonwebtoken';
import { CtError } from '@src/common/error/ct-error';
import { CtErrorType } from '@src/common/error/ct-error-type';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from '@src/modules/auth/token/token.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AccessTokenService extends TokenService {
  constructor(jwtService: JwtService) {
    super(jwtService);
  }
}
