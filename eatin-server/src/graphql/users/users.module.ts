import {TypeOrmModule} from "@nestjs/typeorm";
import {Module} from "@nestjs/common";
import {UsersService} from "./users.service";
import {UsersResolver} from "./users.resolver";
import {Users} from "./users.model";
@Module({
    imports: [TypeOrmModule.forFeature([Users])],
    providers: [UsersService, UsersResolver],
    exports: [UsersService]
})
export class UsersModule {}