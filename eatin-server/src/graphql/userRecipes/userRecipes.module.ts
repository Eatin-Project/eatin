import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Userrecipes } from './userRecipes.model';
import { UserrecipesService } from './userRecipes.service';
import { UserrecipeResolver } from './userRecipes.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Userrecipes])],
  providers: [UserrecipesService, UserrecipeResolver],
  exports: [UserrecipesService],
})
export class UserrecipesModule {}
