import { UserService } from '@src/modules/user/user.service';
import { UserRepository } from '@src/modules/user/repositories/user.repository';
import { User } from '@src/core/autogen/schema.graphql';
import { Injectable, Logger } from '@nestjs/common';
import { CtError } from '@src/common/error/ct-error';
import { CtErrorType } from '@src/common/error/ct-error-type';
import { TokenExpiredError } from 'jsonwebtoken';
import { AccessTokenService } from '@src/modules/auth/token/access-token.service';
import { RefreshTokenService } from '@src/modules/auth/token/refresh-token.service';
import { RedisService } from '@src/common/redis/redis.service';
import { RedisClientType } from 'redis';
import { UserTokenResponse } from '@src/modules/auth/types/user-token-response';

@Injectable()
export class AuthService {
  private readonly logger: Logger = new Logger(this.constructor.name);
  private redisClient: RedisClientType;
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userService: UserService,
    private readonly accessTokenService: AccessTokenService,
    private readonly refreshTokenService: RefreshTokenService,
  ) {}

  /**
   *
   * @param id
   * @param password
   * @param name
   * @param age
   */
  async join(id, password, name, age): Promise<User> {
    this.logger.debug(`join()`);
    this.redisClient = await RedisService.get();
    const instance = this.userRepository.create({
      id,
      password,
      name,
      age,
    });

    await this.userRepository.save(instance);

    // 회원가입 시, 로그인 상태로 정의합니다.
    // fixme. header 에 넣어봅시다.
    instance.token = this.accessTokenService.sign(instance.toPayload());

    // fixme.
    //  redis 에 넣습니다.
    //  client 가 refresh token 을 갖고 있지 않을 때 어떤 값을 key 로 하여 refresh token 을 찾을지 정해야 합니다.
    //  현재는 key: accessToken, value: refreshToken 입니다.
    await this.redisClient.set(
      instance.token,
      this.refreshTokenService.sign(instance.toPayload()),
    );
    return instance;
  }

  /**
   *
   * @param id
   * @param password
   */
  async login(id: string, password: string): Promise<User> {
    this.logger.debug(`login()`);
    this.redisClient = await RedisService.get();

    const instance = await this.userRepository.findOne({
      id,
    });

    if (!(await instance.validatePassword(password))) {
      this.logger.error(`비밀번호 불일치`);
      throw new CtError(CtErrorType.PermissionDenied, '비밀번호 불일치');
    }

    const payload = instance.toPayload();

    // Todo. header 에 넣어봅시다.
    instance.token = this.accessTokenService.sign(payload);

    // fixme.
    //  redis 에 넣습니다.
    //  client 가 refresh token 을 갖고 있지 않을 때 어떤 값을 key 로 하여 refresh token 을 찾을지 정해야 합니다.
    //  현재는 key: accessToken, value: refreshToken 입니다.
    await this.redisClient.set(
      instance.token,
      this.refreshTokenService.sign(payload),
    );
    return instance.toUser();
  }

  /**
   * fixme. tokenservice 로 빼냅시다.
   * @param token
   */
  async accessTokenVerify(token: string): Promise<UserTokenResponse> {
    try {
      return await this.accessTokenService.verifyAsync<UserTokenResponse>(
        token,
      );
    } catch (err) {
      if (err instanceof TokenExpiredError) {
        this.logger.debug(
          `err.message: ${err.message}, access token 이 만료되었습니다. 재발급합니다.`,
        );
        throw new CtError(
          CtErrorType.AccessTokenExpired,
          'access token 이 만료되었습니다. 재발급합니다.',
        );
      }
      this.logger.error(err.message);
      throw new CtError(
        CtErrorType.UnAuthenticated,
        'access token 이 유효하지 않습니다.',
      );
    }
  }

  /**
   * fixme. tokenservice 로 빼냅시다.
   * @param token
   */
  async refreshTokenVerify(token: string): Promise<UserTokenResponse> {
    try {
      return await this.refreshTokenService.verifyAsync<UserTokenResponse>(
        token,
      );
    } catch (err) {
      if (err instanceof TokenExpiredError) {
        this.logger.error(err.message);
        throw new CtError(
          CtErrorType.RefreshTokenExpired,
          'refresh token 이 만료되었습니다. 로그아웃해야합니다.',
        );
      }
      this.logger.error(err.message);
      throw new CtError(
        CtErrorType.UnAuthenticated,
        'refresh token 이 유효하지 않습니다.',
      );
    }
  }

  /**
   * Todo.
   *  tokenservice 로 빼냅시다.
   *  redis 에서 refresh token 을 확인 후에 재발급합니다.
   * @param accessToken
   */
  async reissueAccessToken(accessToken: string) {
    const refreshToken = await this.redisClient.get(accessToken);
    const result = await this.refreshTokenVerify(refreshToken);

    // const asscessToken = await this.accessTokenService.sign()
  }

  /**
   *
   */
  reissueRefreshToken() {}
}
