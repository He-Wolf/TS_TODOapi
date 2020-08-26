import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './models/user.dto';
import { UserEntity } from './entities/user.entity';
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

    async getUser(email: string): Promise<UserDto> {
        const user =  await this.userRepository.findOne({ where: { email } });

        if (!user) {
            throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
        }

        return this.mapper.map(user, UserDto, UserEntity);  
    }

    async createUser(userDto: UserCreateDto): Promise<UserDto> {
        const user: UserEntity =  await this.userRepository.findOne({ where: { email: userDto.email } });

        if (user) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }
    
        const newUser: UserEntity = this.userRepository.create({
            email: userDto.email,
            username: userDto.username,
            password: userDto.password,
        });

        const savedUser: UserEntity = await this.userRepository.save(newUser);

        return this.mapper.map(savedUser, UserDto, UserEntity);
    }
    
    async modifyUser(email: string, userDto: UserCreateDto): Promise<UserDto> {
        let user: UserEntity =  await this.userRepository.findOne({ where: { email } });

        if (!user) {
            throw new HttpException("User doesn't exist", HttpStatus.BAD_REQUEST);
        }

        user.email = userDto.email;
        user.password = userDto.password;
        user.username = userDto.username;

        const modifiedUser = await this.userRepository.save(user);

        return this.mapper.map(modifiedUser, UserDto, UserEntity);
    }
    
    async deleteUser(email: string): Promise<UserDto> {
        const user = await this.userRepository.findOne({ where: { email } });

        if (!user) {
            throw new HttpException("User doesn't exist", HttpStatus.BAD_REQUEST);
        }

        const removedUser = await this.userRepository.remove(user);

        return this.mapper.map(removedUser, UserDto, UserEntity);    
    }
    
    async checkCredentials(userDto: UserLoginDto): Promise<boolean> {    
        const user = await this.userRepository.findOne({ where: { email: userDto.email} });
        
        if (!user) {
            throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);    
        }
          
        const ifCorrect: boolean = await bcrypt.compare(userDto.password, user.password);
        
        if (!ifCorrect) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }

        return ifCorrect;
    }
}
