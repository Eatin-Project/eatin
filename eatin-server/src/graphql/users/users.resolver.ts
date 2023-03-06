
import {Resolver, Query, Args} from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import {UsersService} from "./users.service";
import {Users} from "./users.model";
@Resolver(of => Users)
export class UsersResolver {
    constructor(
        @Inject(UsersService) private userService: UsersService) { }
    @Query(returns => Users)
    async user(@Args('id') id: string): Promise<Users> {
        return await this.userService.findOne(id);
    }
    @Query(returns => [Users])
    async users(): Promise<Users[]> {
        return await this.userService.findAll();
    }
}