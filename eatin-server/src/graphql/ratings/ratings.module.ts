import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { Ratings } from "./ratings.model";
import { RatingsService } from "./ratings.service";
import { RatingsResolver } from "./ratings.resolver";
import { RecipesModule } from "../recipes/recipes.module";

@Module({
    imports: [TypeOrmModule.forFeature([Ratings]), RecipesModule],
    providers: [RatingsService, RatingsResolver],
    exports: [RatingsService],
})
export class RatingsModule {}
