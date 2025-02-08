import { useRequest } from 'ahooks';
import { Todo } from '@cotask-fe/shared/models';
import { aiCompleteTodoDescriptionApi } from '../apis/ai-complete-description';
import { memoized } from '@cotask/utils';

const memoizedAiCompleteTodoDescriptionApi = memoized(aiCompleteTodoDescriptionApi, {
  expirationTime: 1000 * 60, // 1分钟
});

export function useAiTodoDescription(todo: Todo) {
  const {
    data: res,
    loading,
    run,
  } = useRequest(memoizedAiCompleteTodoDescriptionApi, {
    defaultParams: [todo],
    refreshDeps: [todo.title, todo.description],
    refreshDepsAction: () => {
      if ((!todo.title && !todo.description) || (res?.data ?? []).includes(todo.description)) {
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
