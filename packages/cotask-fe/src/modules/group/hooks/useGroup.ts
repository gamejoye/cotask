import { useAuth } from '@cotask-fe/modules/auth/hooks';
import { Group } from '@cotask/types';
import { useRequest } from 'ahooks';
import { getGroupsApi } from '../apis/getgroups';
import { useEffect } from 'react';

type UseGroupReturnType = {
  groups: Group[];
  loading: boolean;
  error: string;
};

// TODO groups 虚拟列表
export function useGroup(): UseGroupReturnType {
  const { isAuthenticated, user } = useAuth();
  const {
    data: res,
    loading,
    error,
    run,
  } = useRequest(getGroupsApi, {
    manual: true,
  });
  useEffect(() => {
    if (isAuthenticated && user) {
      run({
        _start: 0,
        _end: 10,
        _sort: 'createdAt',
        _order: 'DESC',
        user_id: user.id,
      });
    }
  }, [user, isAuthenticated]);
  if (!isAuthenticated || !user) {
    return {
      groups: [],
      loading,
      error: error?.message ?? '',
    };
  }
  return {
    groups:
      !loading && !error && res && res.data && (res.statusCode + '').startsWith('2')
        ? res.data.data
        : [],
    loading,
    error: error?.message ?? '',
  };
}
