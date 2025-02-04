import { useAuth } from '@cotask-fe/modules/auth/hooks';
import { UseTodoReturnType } from './useTodo';
import { useRequest } from 'ahooks';
import { useEffect } from 'react';
import { getTypedTodosApi } from '../apis/get-typed-todos';

// TODO todo虚拟列表
export function useTypedTodos(type: 'today' | 'all' | null): UseTodoReturnType {
  const { isAuthenticated, user } = useAuth();
  const { data: res, loading, error, run } = useRequest(getTypedTodosApi, { manual: true });
  useEffect(() => {
    if (isAuthenticated && user && type) {
      run({
        type,
        query: {
          _start: 0,
          _end: 10,
          _order: 'DESC',
          _sort: 'createdAt',
          user_id: user.id,
        },
      });
    }
  }, [isAuthenticated, user, type]);
  if (!isAuthenticated || !user) {
    return {
      todos: [],
      loading: false,
      error: '',
      mutative: (() => {}) as any,
      create: (() => {}) as any,
      remove: (() => {}) as any,
    };
  }
  return {
    todos:
      !loading && !error && res && res.data && (res.statusCode + '').startsWith('2')
        ? res.data.data
        : [],
    loading,
    error: error?.message ?? '',
    mutative: (() => {}) as any,
    create: (() => {}) as any,
    remove: (() => {}) as any,
  };
}
