import { AutoMap } from 'nestjsx-automapper';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TodoDto {
    @ApiProperty({ example: "89007117-f8b4-44ab-b792-3de558d96789" })
    @AutoMap()
    id: number;

    @ApiProperty({ example: "To clean the house" })
    @AutoMap()
    name: string;

    @ApiProperty({ example: false })
    @AutoMap()
    isDone: boolean;

    @ApiPropertyOptional({ example: "living room, kitchen, bathroom" })
    @AutoMap()
    description?: string;
}
