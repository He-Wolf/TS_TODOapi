import {AutoMap} from 'nestjsx-automapper'

export class TodoDto {
    @AutoMap()
    id: string;
    @AutoMap()
    name: string;
    @AutoMap()
    description?: string;
}
