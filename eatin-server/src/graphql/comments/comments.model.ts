import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Comments {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Field()
  @Column('varchar', { length: 50, nullable: false })
  user_id: string;
  @Field()
  @Column('bigint', { nullable: false })
  recipe_index: number;
  @Field()
  @Column('text', { nullable: false })
  given_comment: string;
  @Field()
  @Column({ type: 'timestamptz', nullable: true })
  comment_timestap: Date;
  @Field()
  user_first_name: string;
  @Field()
  user_last_name: string;
}
