import { Module } from '@nestjs/common';
import { UserModule } from '@src/user/user.module';
import { AppService } from '@src/app.service';
import { AppController } from '@src/app.controller';
import { MysqlModule } from '@src/core/mysql/mysql.module';
import { GraphqlModule } from '@src/core/graphql/graphql.module';
import { ConfigurationModule } from '@src/core/config/configuration.module';

@Module({
  imports: [ConfigurationModule, MysqlModule, GraphqlModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
