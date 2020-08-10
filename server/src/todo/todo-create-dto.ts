import {AutoMap} from 'nestjsx-automapper'

export class TodoCreateDto {
    @AutoMap()
    name: string;
    @AutoMap()
    description?: string;
}
