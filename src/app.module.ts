import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigurationModule } from './core/config/configuration.module';
import { MysqlModule } from './core/mysql/mysql.module';
import { GraphqlModule } from './core/graphql/graphql.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [ConfigurationModule, MysqlModule, GraphqlModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
