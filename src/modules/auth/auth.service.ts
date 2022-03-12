import { JwtService } from '@nestjs/jwt';
import { UserService } from '@src/modules/user/user.service';
import { UserRepository } from '@src/modules/user/repositories/user.repository';
import { User } from '@src/core/autogen/schema.graphql';
import { Injectable, Logger } from '@nestjs/common';
import { CtError } from '@src/common/error/ct-error';
import { CtErrorType } from '@src/common/error/ct-error-type';
import { TokenExpiredError } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  private readonly logger: Logger = new Logger(this.constructor.name);

  constructor(
    private readonly userRepository: UserRepository,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async join(id, password, name, age): Promise<User> {
    this.logger.debug(`join()`);
    const instance = this.userRepository.create({
      id,
      password,
      name,
      age,
    });

    await this.userRepository.save(instance);

    // 회원가입 시, 로그인 상태로 정의합니다.
    // Todo header 에 넣기.
    instance.token = this.jwtService.sign(instance.toPayload());
    return instance;
  }

  /**
   *
   * @param id
   * @param password
   */
  async login(id: string, password: string): Promise<User> {
    this.logger.debug(`login()`);
    const instance = await this.userRepository.findOne({
      id,
    });

    if (!(await instance.validatePassword(password))) {
      this.logger.error(`비밀번호 불일치`);
      throw new CtError(CtErrorType.PermissionDenied, '비밀번호 불일치');
    }

    const payload = {
      id: instance.id,
      name: instance.name,
    };

    // Todo header 에 넣기.
    instance.token = this.jwtService.sign(payload);
    return instance.toUser();
  }

  /**
   *
   * @param token
   */
  async verify(token: string) {
    try {
      return await this.jwtService.verifyAsync(token);
    } catch (err) {
      if (err instanceof TokenExpiredError) {
        this.logger.error(err.message);
        throw new CtError(
          CtErrorType.AccessTokenExpired,
          'token 이 만료되었습니다.',
        );
      }
      this.logger.error(err.message);
      throw new CtError(
        CtErrorType.UnAuthenticated,
        'token 이 유효하지 않습니다.',
      );
    }
  }
}
