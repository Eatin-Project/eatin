import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
@ObjectType()
@Entity()
export class Users {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Field()
    @Column('varchar', { length: 50, nullable: false })
    firstname: string;
    @Field()
    @Column('varchar', { length: 50, nullable: false })
    lastname: string;
    @Field()
    @Column('varchar', { length: 100, unique: true, nullable: false })
    email: string;
    @Field()
    @Column('varchar', { length: 10, nullable: false })
    phone: string;
    @Field()
    @Column('varchar', { length: 10, nullable: false })
    gender: string;
    @Field()
    @Column('timestamp', { nullable: false })
    birthdate: Date;
    @Field()
    @Column('varchar', { length: 50, nullable: false })
    country: string;
}