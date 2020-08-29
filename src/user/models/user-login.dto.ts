import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserLoginDto {
    @ApiProperty({ example: 'example@email.com' })
    @IsNotEmpty()
    readonly email: string;

    @ApiProperty({ example: 'SecurePass123.' })
    @IsNotEmpty()
    readonly password: string;
}
