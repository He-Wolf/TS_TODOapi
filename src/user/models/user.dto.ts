import { IsNotEmpty, IsEmail } from 'class-validator';
import { AutoMap } from 'nestjsx-automapper';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
    @ApiProperty({ example: "b8bd19ab-48a4-47f9-8ecf-a247a95fbf18" })
    @IsNotEmpty()
    @AutoMap()
    id: string;

    @ApiProperty({ example: "example@email.com" })
    @IsNotEmpty()
    @IsEmail()
    @AutoMap()
    email: string;
    
    @ApiProperty({ example: "MyU53rname_99" })
    @IsNotEmpty()
    @AutoMap()
    username: string;
}
