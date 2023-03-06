import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {GraphQLModule} from '@nestjs/graphql';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ApolloDriver, ApolloDriverConfig} from '@nestjs/apollo';
import {GraphqlModule} from "./graphql/graphql.module";

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
            entities: ['dist/**/*.model.js'],
            synchronize: false,
        }),
        GraphqlModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
