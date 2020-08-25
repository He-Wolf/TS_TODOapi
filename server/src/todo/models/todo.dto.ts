import {AutoMap} from 'nestjsx-automapper'

export class TodoDto {
    @AutoMap()
    id: number;

    @AutoMap()
    name: string;
    
    @AutoMap()
    description?: string;
}
