import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/core/autogen/schema.gql'),
      sortSchema: true,
    }),
  ],
})
export class GraphqlModule {}
