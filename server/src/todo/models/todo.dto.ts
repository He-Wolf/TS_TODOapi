import { AutoMap } from 'nestjsx-automapper';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TodoDto {
    @ApiProperty()
    @AutoMap()
    id: number;

    @ApiProperty()
    @AutoMap()
    name: string;

    @ApiProperty()
    @AutoMap()
    isDone: boolean;

    @ApiPropertyOptional()
    @AutoMap()
    description?: string;
}
