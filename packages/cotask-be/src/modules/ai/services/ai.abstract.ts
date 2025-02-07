import { Injectable } from '@nestjs/common';
import { Todo } from '@cotask-be/modules/todos';

@Injectable()
export abstract class IAiService {
  abstract completeTodoTitle(partialTodo: Partial<Todo>): Promise<string[]>;
  abstract completeTodoDescription(partialTodo: Partial<Todo>): Promise<string[]>;
}
