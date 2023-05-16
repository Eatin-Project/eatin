import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class UserRecommendations {
  @Field()
  @PrimaryColumn('varchar', { length: 50, nullable: false })
  user_id: string;
  @Field()
  @Column('varchar')
  recommendations: string;
}
