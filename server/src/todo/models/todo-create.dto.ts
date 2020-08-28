import { IsNotEmpty, IsOptional, MaxLength, IsBoolean, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TodoCreateDto {
    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(20)
    @IsString()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    isDone: boolean;

    @ApiPropertyOptional()
    @IsOptional()    
    @MaxLength(50)
    @IsString()
    description?: string;
}
