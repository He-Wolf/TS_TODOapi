import { IsNotEmpty, IsEmail } from 'class-validator';
import {AutoMap} from 'nestjsx-automapper'

export class UserDto {
    @IsNotEmpty()
    @AutoMap()
    id: string;

    @IsNotEmpty()
    @IsEmail()
    @AutoMap()
    email: string;
    
    @IsNotEmpty()
    @AutoMap()
    username: string;
}
