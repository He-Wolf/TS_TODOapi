import { IsNotEmpty, IsEmail } from 'class-validator';
import {AutoMap} from 'nestjsx-automapper'

export class UserCreateDto {
    @IsNotEmpty()
    @IsEmail()
    @AutoMap()
    email: string;

    @IsNotEmpty()
    @AutoMap()
    username: string;

    @IsNotEmpty()
    @AutoMap()
    password: string;
}
