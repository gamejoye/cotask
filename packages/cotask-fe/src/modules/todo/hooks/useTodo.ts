import { Group, Todo } from '@cotask/types';
import { useRequest } from 'ahooks';
import { getTodosApi } from '../apis/gettodos';
import { useAuth } from '@cotask-fe/modules/auth/hooks';
import { useEffect } from 'react';

export type UseTodoReturnType = {
  todos: Todo[];
  loading: boolean;
  error: string;
};

// TODO todo虚拟列表
export function useTodo(group: Group | null): UseTodoReturnType {
  const { isAuthenticated, user } = useAuth();
  const { data: res, loading, error, run } = useRequest(getTodosApi, { manual: true });
  useEffect(() => {
    console.log(isAuthenticated, user, group);
    if (isAuthenticated && user && group) {
      run({
        _start: 0,
        _end: 10,
        _order: 'DESC',
        _sort: 'createdAt',
        group_id: group.id,
      });
    }
  }, [isAuthenticated, user, group]);
  if (!group || !isAuthenticated || !user) {
    return {
      todos: [],
      loading: false,
      error: '',
    };
  }
  return {
    todos:
      !loading && !error && res && res.data && (res.statusCode + '').startsWith('2')
        ? res.data.data
        : [],
    loading,
    error: error?.message ?? '',
  };
}
