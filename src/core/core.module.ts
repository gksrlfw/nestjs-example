import { Module } from '@nestjs/common';
import { ConfigurationModule } from '@src/core/config/configuration.module';
import { MysqlModule } from '@src/core/mysql/mysql.module';
import { GraphqlModule } from '@src/core/graphql/graphql.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from '@src/core/filter/all-exceptions.filter';
import { ErrorHandlerFactory } from '@src/core/filter/factories/error-handler-factory';

@Module({
  imports: [ConfigurationModule, MysqlModule, GraphqlModule],
  providers: [
    ErrorHandlerFactory,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class CoreModule {}
