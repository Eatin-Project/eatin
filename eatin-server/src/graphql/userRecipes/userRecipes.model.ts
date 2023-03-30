import { Entity, Column, PrimaryColumn } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
@ObjectType()
@Entity()
export class UserRecipes {
  @Field()
  @PrimaryColumn('varchar', { length: 50, nullable: false })
  user_id: string;
  @Field()
  @PrimaryColumn('bigint', { nullable: false })
  recipe_index: number;
  @Field()
  @Column('boolean', { nullable: false })
  is_saved: boolean;
}
