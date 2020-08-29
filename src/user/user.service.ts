import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { UserLoginDto } from './models/user-login.dto';
import { UserCreateDto } from './models/user-create.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)    
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    async getUser(email: string): Promise<UserEntity> {
        const user =  await this.userRepository.findOne({ where: { email } });

        if (!user) {
            throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
        }

        return user; 
    }

    async createUser(userDto: UserCreateDto): Promise<UserEntity> {
        let user: UserEntity =  await this.userRepository.findOne({ where: { email: userDto.email } });

        if (user) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }
    
        const newUser: UserEntity = this.userRepository.create({
            email: userDto.email,
            username: userDto.username,
            password: userDto.password,
        });

        user = await this.userRepository.save(newUser);

        return user;
    }
    
    async modifyUser(email: string, userDto: UserCreateDto): Promise<UserEntity> {
        let user: UserEntity =  await this.userRepository.findOne({ where: { email } });

        if (!user) {
            throw new HttpException("User doesn't exist", HttpStatus.BAD_REQUEST);
        }

        user.email = userDto.email;
        user.password = userDto.password;
        user.username = userDto.username;

        user = await this.userRepository.save(user);

        return user;
    }
    
    async deleteUser(email: string): Promise<UserEntity> {
        let user = await this.userRepository.findOne({ where: { email } });

        if (!user) {
            throw new HttpException("User doesn't exist", HttpStatus.BAD_REQUEST);
        }

        user = await this.userRepository.remove(user);

        return user;    
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
