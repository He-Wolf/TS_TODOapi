import { IsNotEmpty, IsOptional } from 'class-validator';
import {AutoMap} from 'nestjsx-automapper'

export class TodoCreateDto {
    @IsNotEmpty()
    @AutoMap()
    name: string;
    
    @IsOptional()
    @AutoMap()
    description?: string;
}
