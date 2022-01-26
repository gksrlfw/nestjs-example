import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppEnvironment } from './app-env.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: AppEnvironment.setEnvPostfix(),
    }),
  ],
})
export class ConfigurationModule {}
