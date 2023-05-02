import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Recipes } from '../recipes/recipes.model';
@ObjectType()
@Entity()
export class Userrecipes {
  @Field()
  @PrimaryColumn('varchar', { length: 50, nullable: false })
  user_id: string;
  @Field()
  @PrimaryColumn('bigint', { nullable: false })
  recipe_index: number;
  @Field()
  @Column('boolean', { nullable: false })
  is_saved: boolean;
  @Field()
  @Column('boolean', { nullable: false })
  is_uploaded: boolean;
  @Field()
  @Column('varchar', { length: 100, nullable: false })
  given_comment: string;
  @Field()
  @OneToOne(() => Recipes)
  @JoinColumn({ name: 'recipe_index' })
  recipe: Recipes;
}
