import { IsNotEmpty, IsEmail, MaxLength, Matches } from 'class-validator';
import {Compare} from '../compare.decorator';

export class UserCreateDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MaxLength(30)
    username: string;

    @IsNotEmpty()
    //minimum eight, maximum twenty characters,
    //at least one uppercase letter and one lowercase letter,
    //at least one number and one special character
    @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[\W]).{8,20}$/)
    password: string;

    @IsNotEmpty()
    @Compare('password')
    passwordConfirm: string;
}
