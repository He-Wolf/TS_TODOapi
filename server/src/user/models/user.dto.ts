import { IsNotEmpty, IsEmail } from 'class-validator';
import {AutoMap} from 'nestjsx-automapper';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
    @ApiProperty()
    @IsNotEmpty()
    @AutoMap()
    id: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    @AutoMap()
    email: string;
    
    @ApiProperty()
    @IsNotEmpty()
    @AutoMap()
    username: string;
}
