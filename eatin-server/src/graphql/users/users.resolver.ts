import {Resolver, Query, Args, Mutation} from '@nestjs/graphql';
import {Inject} from '@nestjs/common';
import {UsersService} from "./users.service";
import {Users} from "./users.model";

@Resolver(of => Users)
export class UsersResolver {
    constructor(
        @Inject(UsersService) private usersService: UsersService) {
    }

    @Query(returns => Users)
    async user(@Args('id') id: string): Promise<Users> {
        return await this.usersService.findOne(id);
    }

    @Query(returns => [Users])
    async users(): Promise<Users[]> {
        return await this.usersService.findAll();
    }

    @Mutation(returns => Users)
    async createUser(
        @Args('id') id: string,
        @Args('firstname') firstname: string,
        @Args('lastname') lastname: string,
        @Args('email') email: string,
        @Args('phone') phone: string,
        @Args('gender') gender: string,
        @Args('birthdate') birthdate: Date,
        @Args('country') country: string,
    ): Promise<Users> {
        return await this.usersService.create({id, firstname, lastname, email, phone, gender, birthdate, country})
    }
}