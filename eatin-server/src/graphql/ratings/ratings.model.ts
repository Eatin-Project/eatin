import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Ratings {
  @Field()
  @PrimaryColumn('varchar', { length: 50, nullable: false })
  user_id: string;
  @Field()
  @PrimaryColumn('bigint', { nullable: false })
  recipe_index: number;
  @Field()
  @Column('double precision', { nullable: false })
  rating: number;
  @Field()
  @Column('timestamp', { nullable: false })
  rating_timestamp: Date;
}
