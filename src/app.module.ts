import { Module } from '@nestjs/common';
import { UserModule } from '@src/modules/user/user.module';
import { MysqlModule } from '@src/core/mysql/mysql.module';
import { GraphqlModule } from '@src/core/graphql/graphql.module';
import { ConfigurationModule } from '@src/core/config/configuration.module';

@Module({
  imports: [ConfigurationModule, MysqlModule, GraphqlModule, UserModule],
})
export class AppModule {}
