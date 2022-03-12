import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { CtError } from '@src/common/error/ct-error';
import { CtErrorType } from '@src/common/error/ct-error-type';
import { AuthService } from '@src/modules/auth/auth.service';

@Injectable()
export class JwtGuard implements CanActivate {
  private readonly logger = new Logger(JwtGuard.name);
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('???');
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    const authorization = req.headers.authorization;

    if (!authorization) {
      this.logger.error(`authorization 이 없습니다.`);
      throw new CtError(CtErrorType.UnAuthenticated, 'Token is not valid');
    }

    const tokens = authorization.split(' ');

    if (tokens.length !== 2 || tokens[0] !== 'Bearer') {
      this.logger.error(`authorization 이 유효하지 않습니다.`);
      throw new CtError(CtErrorType.UnAuthenticated, 'Token is not valid');
    }

    req.user = await this.authService.verify(tokens[1]);

    return true;
  }
}
