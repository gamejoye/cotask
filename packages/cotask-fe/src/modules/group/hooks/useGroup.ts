import { useAuth } from '@cotask-fe/modules/auth/hooks';
import { useRequest } from 'ahooks';
import { getGroupsApi } from '../apis/getgroups';
import { useEffect, useState } from 'react';
import { Group } from '@cotask-fe/shared/models';
import { createGroupApi } from '../apis/create-group';

type UseGroupReturnType = {
  groups: Group[];
  loading: boolean;
  error: string;
  create: (...args: Parameters<typeof createGroupApi>) => Promise<Group | null>;
};

// TODO groups 虚拟列表
export function useGroup(): UseGroupReturnType {
  const [error, setError] = useState<Error | undefined>(undefined);
  const { isAuthenticated, user } = useAuth();
  const [groups, setGroups] = useState<Group[]>([]);
  const { loading, runAsync: runGetGroupsAsync } = useRequest(getGroupsApi, {
    manual: true,
    onError(e) {
      setError(e);
    },
  });

  const { runAsync: runCreateGroupAsync } = useRequest(createGroupApi, {
    manual: true,
  });

  const create: UseGroupReturnType['create'] = async (...args) => {
    try {
      const res = await runCreateGroupAsync(...args);
      if (res && res.data && (res.statusCode + '').startsWith('2')) {
        const group = res.data;
        setGroups([group, ...groups]);
        return group;
      }
      throw new Error('创建分组失败');
    } catch (e) {
      setError(e as Error);
      return null;
    }
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      (async () => {
        try {
          const res = await runGetGroupsAsync({
            _start: 0,
            _end: 10,
            _sort: 'createdAt',
            _order: 'DESC',
            user_id: user.id,
          });
          if (res && res.data && (res.statusCode + '').startsWith('2')) {
            setGroups(res.data.data);
          } else {
            throw new Error('获取分组失败');
          }
        } catch (e) {
          setError(e as Error);
        }
      })();
    }
  }, [user, isAuthenticated]);
  if (!isAuthenticated || !user) {
    return {
      groups: [],
      loading,
      error: error?.message ?? '',
      create,
    };
  }
  return {
    groups,
    loading,
    error: error?.message ?? '',
    create,
  };
}
