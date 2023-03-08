import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
@ObjectType()
@Entity()
export class Recipes {
    @Field()
    @PrimaryGeneratedColumn('increment', {type: 'bigint'})
    index: string;
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
    vote_count: string;
    @Field()
    @Column('bigint')
    rating: string;
    @Field()
    @Column('text')
    description: string;
    @Field()
    @Column('text')
    cuisine: string;
    @Field()
    @Column('text')
    diet: string;
    @Field()
    @Column('text')
    prep_time: string;
    @Field()
    @Column('text')
    cook_time: string;
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
}
