import { IsNotEmpty, IsEmail, MaxLength, Matches } from 'class-validator';
import {Compare} from '../compare.decorator';
import { ApiProperty } from '@nestjs/swagger';

export class UserCreateDto {
    @ApiProperty({ example: 'example@email.com' })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'MyU53rname_99' })
    @IsNotEmpty()
    @MaxLength(30)
    username: string;

    @ApiProperty({ example: 'SecurePass123.' })
    @IsNotEmpty()
    //minimum eight, maximum twenty characters,
    //at least one uppercase letter and one lowercase letter,
    //at least one number and one special character
    @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[\W]).{8,20}$/)
    password: string;

    @ApiProperty({ example: 'SecurePass123.' })
    @IsNotEmpty()
    @Compare('password')
    passwordConfirm: string;
}
