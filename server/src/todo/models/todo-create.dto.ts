import { IsNotEmpty, IsOptional, MaxLength, IsBoolean, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TodoCreateDto {
    @ApiProperty({ example: "To clean the house" })
    @IsNotEmpty()
    @MaxLength(20)
    @IsString()
    name: string;

    @ApiProperty({ example: false })
    @IsNotEmpty()
    @IsBoolean()
    isDone: boolean;

    @ApiPropertyOptional({ example: "living room, kitchen, bathroom" })
    @IsOptional()    
    @MaxLength(50)
    @IsString()
    description?: string;
}
