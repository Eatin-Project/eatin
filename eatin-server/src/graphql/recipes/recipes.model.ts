import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
@ObjectType()
@Entity()
export class Recipes {
  @Field()
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  index: number;
  @Field()
  @Column('text')
  recipe_title: string;
  @Field()
  @Column('text')
  url: string;
  @Field()
  @Column('text')
  record_health: string;
  @Field()
  @Column('bigint')
  vote_count: number;
  @Field()
  @Column('double precision')
  rating: number;
  @Field()
  @Column('text')
  description: string;
  @Field()
  @Column('text')
  cuisine: string;
  @Field()
  @Column('text')
  course: string;
  @Field()
  @Column('text')
  diet: string;
  @Field()
  @Column('bigint')
  prep_time: number;
  @Field()
  @Column('bigint')
  cook_time: number;
  @Field()
  @Column('text')
  ingredients: string;
  @Field()
  @Column('text')
  instructions: string;
  @Field()
  @Column('text')
  author: string;
  @Field()
  @Column('text')
  tags: string;
  @Field()
  @Column('text')
  category: string;
  @Field()
  @Column('text')
  image: string;
  @Field()
  @Column('text')
  difficulty: string;
  @Field()
  @Column('bigint')
  total_time: number;
  @Field()
  is_saved: boolean;
  @Field()
  is_uploaded: boolean;
}
