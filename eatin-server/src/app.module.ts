import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphqlModule } from './graphql/graphql.module';
import { Recipes } from './graphql/recipes/recipes.model';
import { Users } from './graphql/users/users.model';
import {Ratings} from "./graphql/ratings/ratings.model";

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '10.10.248.108',
      port: 5432,
      username: 'eatin',
      password: 'eatin',
      database: 'postgres',
      entities: [Recipes, Users, Ratings],
      synchronize: false,
    }),
    GraphqlModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
