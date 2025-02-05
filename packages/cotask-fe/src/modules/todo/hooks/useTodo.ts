import { Group, Todo } from '@cotask-fe/shared/models';
import { useCounter, useRequest } from 'ahooks';
import { getTodosApi } from '../apis/get-todos';
import { useAuth } from '@cotask-fe/modules/auth/hooks';
import { useEffect, useState } from 'react';
import { updateTodoApi } from '../apis/update-todo';
import { createTodoApi } from '../apis/create-todo';
import { deleteTodoApi } from '../apis/delete-todo';
import { getTypedTodosApi } from '../apis/get-typed-todos';

export type UseTodoReturnType = {
  todos: Todo[];
  loading: boolean;
  error: string;
  mutative: (...args: Parameters<typeof updateTodoApi>) => Promise<Todo | null>;
  create: (...args: Parameters<typeof createTodoApi>) => Promise<Todo | null>;
  remove: (...args: Parameters<typeof deleteTodoApi>) => Promise<boolean>;
  loadMore: () => void;
  hasMore: boolean;
};

const PAGE_SIZE = 10;

type UseTodoParams = { group: Group; type?: never } | { group?: never; type: 'today' | 'all' };

// TODO todo虚拟列表
export function useTodo(params: UseTodoParams): UseTodoReturnType {
  const { group, type } = params;
  const [todos, setTodos] = useState<Todo[]>([]);
  const { isAuthenticated, user } = useAuth();
  const [totalTodos, { inc, set, dec }] = useCounter(0, { min: 0 });
  const { loading, runAsync: runGetTodosAsync } = useRequest(getTodosApi, {
    manual: true,
  });
  const { runAsync: runCreateTodoAsync } = useRequest(createTodoApi, { manual: true });
  const { runAsync: runUpdateTodoAsync } = useRequest(updateTodoApi, { manual: true });
  const { runAsync: runRemoveTodoAsync } = useRequest(deleteTodoApi, { manual: true });
  const { loading: typedLoading, runAsync: runGetTypedTodosAsync } = useRequest(getTypedTodosApi, {
    manual: true,
  });
  const [error, setError] = useState<Error | undefined>(undefined);

  console.log(params);

  const loadMore = async () => {
    if (!isAuthenticated || !user) return;
    try {
      const res = await (group
        ? runGetTodosAsync({
            _start: todos.length,
            _end: todos.length + PAGE_SIZE,
            _order: 'DESC',
            _sort: 'createdAt',
            group_id: group.id,
          })
        : runGetTypedTodosAsync({
            type,
            query: {
              _start: todos.length,
              _end: todos.length + PAGE_SIZE,
              _order: 'DESC',
              _sort: 'createdAt',
              user_id: user.id,
            },
          }));
      if (res && res.data && (res.statusCode + '').startsWith('2')) {
        const { data, total } = res.data;
        setTodos([...todos, ...data]);
        set(total);
      } else {
        throw new Error('获取todo失败');
      }
    } catch (e) {
      setError(e as Error);
    }
  };

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
        inc();
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
        dec();
        return true;
      }
      throw new Error('删除todo失败');
    } catch (e) {
      setError(e as Error);
      return false;
    }
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      (async () => {
        try {
          const res = await (group
            ? runGetTodosAsync({
                _start: 0,
                _end: PAGE_SIZE,
                _order: 'DESC',
                _sort: 'createdAt',
                group_id: group.id,
              })
            : runGetTypedTodosAsync({
                type,
                query: {
                  _start: 0,
                  _end: PAGE_SIZE,
                  _order: 'DESC',
                  _sort: 'createdAt',
                  user_id: user.id,
                },
              }));
          if (res && res.data && (res.statusCode + '').startsWith('2')) {
            const { data, total } = res.data;
            setTodos(data);
            set(total);
          } else {
            throw new Error('获取todo失败');
          }
        } catch (e) {
          setError(e as Error);
        }
      })();
    }
  }, [isAuthenticated, user, group, type]);
  if (!isAuthenticated || !user) {
    return {
      todos: [],
      loading: false,
      error: '',
      hasMore: false,
      mutative,
      create,
      remove,
      loadMore,
    };
  }
  return {
    todos,
    loading: group ? loading : typedLoading,
    error: error?.message ?? '',
    hasMore: totalTodos > todos.length,
    mutative,
    create,
    remove,
    loadMore,
  };
}
