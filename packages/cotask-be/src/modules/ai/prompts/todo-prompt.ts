import { Todo } from '@cotask-be/modules/todos';

export function completeTodoTitlePrompt(partialTodo: Partial<Pick<Todo, 'title' | 'description'>>) {
  partialTodo = { title: partialTodo.title ?? '', description: partialTodo.description ?? '' };
  return `基于以下简短的待办事项对象，生成更详细的标题：
          ${JSON.stringify(partialTodo)}
          请按以下JSON格式返回：
          {
            data: string[]
          }
          注意：
          1. 至多返回三组不同的标题
          `;
}

export function completeTodoDescriptionPrompt(
  partialTodo: Partial<Pick<Todo, 'title' | 'description'>>
) {
  partialTodo = { title: partialTodo.title ?? '', description: partialTodo.description ?? '' };
  return `基于以下简短的待办事项对象，生成更详细的描述：
          ${JSON.stringify(partialTodo)}
          请按以下JSON格式返回：
          {
            data: string[]
          }
          注意：
          1. 至多返回三组不同的描述
          2. 描述长度最好不超过200字
          `;
}
