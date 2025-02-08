import { useRequest } from 'ahooks';
import { aiCompleteTodoTitleApi } from '../apis/ai-complete-todo-title';
import { Todo } from '@cotask-fe/shared/models';
import { memoized } from '@cotask/utils';

const memoizedAiCompleteTodoTitleApi = memoized(aiCompleteTodoTitleApi, {
  expirationTime: 1000 * 60, // 1分钟
});

export function useAiTodoTitle(todo: Todo) {
  const {
    data: res,
    loading,
    run,
  } = useRequest(memoizedAiCompleteTodoTitleApi, {
    defaultParams: [todo],
    refreshDeps: [todo.title, todo.description],
    refreshDepsAction: () => {
      if ((!todo.title && !todo.description) || (res?.data ?? []).includes(todo.title)) {
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
