import {AutoMap} from 'nestjsx-automapper'

export class TodoEntity {
    @AutoMap()
    id: string;
    @AutoMap()
    name: string;
    @AutoMap()
    description?: string;
}
