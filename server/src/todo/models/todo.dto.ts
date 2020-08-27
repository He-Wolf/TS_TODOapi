import { AutoMap } from 'nestjsx-automapper';

export class TodoDto {
    @AutoMap()
    id: number;

    @AutoMap()
    name: string;

    @AutoMap()
    isDone: boolean;

    @AutoMap()
    description?: string;
}
