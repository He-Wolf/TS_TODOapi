import { TodoDto } from './models/todo.dto';
import { TodoEntity } from './entities/todo.entity';
import { AutoMapper, ProfileBase, Profile } from 'nestjsx-automapper';

@Profile()
export class TodoProfile extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(TodoEntity, TodoDto).reverseMap();
  }
}