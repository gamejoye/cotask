import { useRequest } from 'ahooks';
import { aiCompleteTodoTitleApi } from '../apis/ai-complete-todo-title';
import { Todo } from '@cotask-fe/shared/models';

export function useAiTodoTitle(todo: Todo) {
  const {
    data: res,
    loading,
    run,
  } = useRequest(aiCompleteTodoTitleApi, {
    refreshDeps: [todo.title, todo.description],
    refreshDepsAction: () => {
      if (!todo.title && !todo.description) {
        return;
      }
      run(todo);
    },
  });

  return {
    data: res?.data ?? [],
    loading,
  };
}
