import { TodoEntity } from './todo.entity';

describe('TodoEntity', () => {
  it('should be defined', () => {
    expect(new TodoEntity()).toBeDefined();
  });
});
