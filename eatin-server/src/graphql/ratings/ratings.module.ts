import {TypeOrmModule} from "@nestjs/typeorm";
import {Module} from "@nestjs/common";
import {Ratings} from "./ratings.model";
import {RatingsService} from "./ratings.service";
import {RatingsResolver} from "./ratings.resolver";

@Module({
    imports: [TypeOrmModule.forFeature([Ratings])],
    providers: [RatingsService, RatingsResolver],
    exports: [RatingsService]
})
export class RatingsModule {}