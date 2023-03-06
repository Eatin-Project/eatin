import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from 'typeorm';
import {UserDTO} from "./users.dto";
import {Users} from "./users.model";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
    ) {
    }

    create(details: UserDTO): Promise<Users> {
        return this.usersRepository.save(details);
    }

    findAll(): Promise<Users[]> {
        return this.usersRepository.find();
    }

    findOne(id: string): Promise<Users> {
        return this.usersRepository.findOneBy({id: id});
    }
}