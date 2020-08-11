import { TodoListDto } from './todo-list.dto';

describe('TodoListDto', () => {
  it('should be defined', () => {
    expect(new TodoListDto()).toBeDefined();
  });
});
