import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './models/user.dto';
import { UserEntity } from './models/user.entity';
import { UserLoginDto } from './models/user-login.dto';
import { UserCreateDto } from './models/user-create.dto';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)    
        private readonly userRepository: Repository<UserEntity>,
        @InjectMapper()
        private readonly mapper: AutoMapper,
    ) {}

    async findOneByEmail(email: string): Promise<UserDto> {
        const user =  await this.userRepository.findOne({ where: { email } });    
        return this.mapper.map(user, UserDto, UserEntity);  
    }

    async findOneByLogin({ username, password }: UserLoginDto): Promise<UserDto> {    
        const user = await this.userRepository.findOne({ where: { username } });
        
        if (!user) {
            throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);    
        }
          
        const areEqual = await bcrypt.compare(password, user.password);
        
        if (!areEqual) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);    
        }
        
        return this.mapper.map(user, UserDto, UserEntity);  
    }

    async create(userDto: UserCreateDto): Promise<UserDto> {    
        // check if the user exists in the db
        const userInDb = await this.findOneByEmail(userDto.email);
        if (userInDb) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }
    
        const user: UserEntity = this.userRepository.create({
            email: userDto.email,
            username: userDto.username,
            password: userDto.password,
        });
    
        await this.userRepository.save(user);
    
        return this.mapper.map(user, UserDto, UserEntity);
      }
}
