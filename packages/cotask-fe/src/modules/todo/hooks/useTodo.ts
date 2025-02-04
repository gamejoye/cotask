import { Group, Todo } from '@cotask-fe/shared/models';
import { useRequest } from 'ahooks';
import { getTodosApi } from '../apis/get-todos';
import { useAuth } from '@cotask-fe/modules/auth/hooks';
import { useEffect, useState } from 'react';
import { updateTodoApi } from '../apis/update-todo';
import { createTodoApi } from '../apis/create-todo';
import { deleteTodoApi } from '../apis/delete-todo';

export type UseTodoReturnType = {
  todos: Todo[];
  loading: boolean;
  error: string;
  mutative: (...args: Parameters<typeof updateTodoApi>) => Promise<Todo | null>;
  create: (...args: Parameters<typeof createTodoApi>) => Promise<Todo | null>;
  remove: (...args: Parameters<typeof deleteTodoApi>) => Promise<boolean>;
};

// TODO todo虚拟列表
export function useTodo(group: Group | null): UseTodoReturnType {
  const [todos, setTodos] = useState<Todo[]>([]);
  const { isAuthenticated, user } = useAuth();
  const { loading, runAsync: runGetTodosAsync } = useRequest(getTodosApi, { manual: true });
  const { runAsync: runCreateTodoAsync } = useRequest(createTodoApi, { manual: true });
  const { runAsync: runUpdateTodoAsync } = useRequest(updateTodoApi, { manual: true });
  const { runAsync: runRemoveTodoAsync } = useRequest(deleteTodoApi, { manual: true });
  const [error, setError] = useState<Error | undefined>(undefined);

  const mutative: UseTodoReturnType['mutative'] = async (params, body) => {
    try {
      const res = await runUpdateTodoAsync(params, body);
      if (res && res.data && (res.statusCode + '').startsWith('2')) {
        const todo = res.data;
        setTodos(todos.map(t => (t.id === todo.id ? todo : t)));
        return todo;
      }
      throw new Error('更新todo失败');
    } catch (e) {
      setError(e as Error);
      return null;
    }
  };

  const create: UseTodoReturnType['create'] = async body => {
    try {
      const res = await runCreateTodoAsync(body);
      if (res && res.data && (res.statusCode + '').startsWith('2')) {
        const todo = res.data;
        setTodos([todo, ...todos]);
        return todo;
      }
      throw new Error('创建todo失败');
    } catch (e) {
      setError(e as Error);
      return null;
    }
  };

  const remove: UseTodoReturnType['remove'] = async params => {
    try {
      const res = await runRemoveTodoAsync(params);
      if (res && res.data && (res.statusCode + '').startsWith('2')) {
        setTodos(todos.filter(t => t.id !== params.id));
        return true;
      }
      throw new Error('删除todo失败');
    } catch (e) {
      setError(e as Error);
      return false;
    }
  };

  useEffect(() => {
    if (isAuthenticated && user && group) {
      (async () => {
        try {
          const res = await runGetTodosAsync({
            _start: 0,
            _end: 10,
            _order: 'DESC',
            _sort: 'createdAt',
            group_id: group.id,
          });
          if (res && res.data && (res.statusCode + '').startsWith('2')) {
            setTodos(res.data.data);
          } else {
            throw new Error('获取todo失败');
          }
        } catch (e) {
          setError(e as Error);
        }
      })();
    }
  }, [isAuthenticated, user, group]);
  if (!group || !isAuthenticated || !user) {
    return {
      todos: [],
      loading: false,
      error: '',
      mutative,
      create,
      remove,
    };
  }
  return {
    todos,
    loading,
    error: error?.message ?? '',
    mutative,
    create,
    remove,
  };
}
