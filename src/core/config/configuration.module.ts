import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppEnvironment } from './app-env.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: AppEnvironment.setEnvPostfix(),
      ignoreEnvFile: !AppEnvironment.isLocal(),
    }),
  ],
})
export class ConfigurationModule implements OnModuleInit {
  private readonly logger: Logger = new Logger(this.constructor.name);

  onModuleInit(): any {
    this.logger.debug(`ConfigurationModule Init`);
  }
}
