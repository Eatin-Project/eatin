import {TypeOrmModule} from "@nestjs/typeorm";
import {Module} from "@nestjs/common";
import {Recipes} from "./recipes.model";
import {RecipesService} from "./recipes.service";
import {RecipesResolver} from "./recipes.resolver";
@Module({
    imports: [TypeOrmModule.forFeature([Recipes])],
    providers: [RecipesService, RecipesResolver],
    exports: [RecipesService]
})
export class RecipesModule {}