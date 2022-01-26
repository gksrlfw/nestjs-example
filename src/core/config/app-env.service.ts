import { ConfigService } from '@nestjs/config';
import { AppEnvEnum } from './app-env.enum';

/**
 *
 */
export namespace AppEnvironment {
  const configService = new ConfigService();
  const value = configService.get<string>('APP_ENV');

  export function isLocal(): boolean {
    return value === AppEnvEnum.LOCAL;
  }

  export function isDev(): boolean {
    return value === AppEnvEnum.DEV;
  }

  export function isProd(): boolean {
    return value === AppEnvEnum.PROD;
  }

  export function isTest(): boolean {
    return value === AppEnvEnum.TEST;
  }

  /**
   *
   */
  export function setEnvPostfix(): string {
    return `.env.${value}`;
  }
}
