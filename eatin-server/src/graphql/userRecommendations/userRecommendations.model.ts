import { Entity, Column, PrimaryColumn } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
@ObjectType()
@Entity()
export class Userrecommendations {
  @Field()
  @PrimaryColumn('varchar', { length: 50, nullable: false })
  user_id: string;
  @Field()
  @Column('varchar')
  recommendations: string;
}
