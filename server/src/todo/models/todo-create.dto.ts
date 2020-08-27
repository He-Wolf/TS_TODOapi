import { IsNotEmpty, IsOptional, MaxLength, IsBoolean, IsString } from 'class-validator';

export class TodoCreateDto {
    @IsNotEmpty()
    @MaxLength(20)
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsBoolean()
    isDone: boolean;

    @IsOptional()    
    @MaxLength(50)
    @IsString()
    description?: string;
}
