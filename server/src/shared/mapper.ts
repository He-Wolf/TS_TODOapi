import { TodoDto } from '../todo/todo-dto';
import { TodoEntity } from '../todo/todo-entity';

export const toTodoDto = (data: TodoEntity): TodoDto => {
    const { id, name, description } = data;
    let todoDto: TodoDto = { id, name, description };
    return todoDto;
}