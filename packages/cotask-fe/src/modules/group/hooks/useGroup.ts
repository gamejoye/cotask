import { useAuth } from '@cotask-fe/modules/auth/hooks';
import { useCounter, useRequest } from 'ahooks';
import { getGroupsApi } from '../apis/get-groups';
import { useEffect, useState } from 'react';
import { Group } from '@cotask-fe/shared/models';
import { createGroupApi } from '../apis/create-group';
import { updateGroupApi } from '../apis/update-group';
type UseGroupReturnType = {
  groups: Group[];
  loading: boolean;
  error: string;
  hasMore: boolean;
  create: (...args: Parameters<typeof createGroupApi>) => Promise<Group | null>;
  mutative: (...args: Parameters<typeof updateGroupApi>) => Promise<Group | null>;
  loadMore: () => void;
};

const PAGE_SIZE = 5;

export function useGroup(): UseGroupReturnType {
  const [error, setError] = useState<Error | undefined>(undefined);
  const [totalGroups, { inc: incTotalGroups, set: setTotalGroups }] = useCounter(0);
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

  const { runAsync: runUpdateGroupAsync } = useRequest(updateGroupApi, {
    manual: true,
    onError(e) {
      setError(e);
    },
  });

  const loadMore = () => {
    if (groups.length >= totalGroups || !isAuthenticated || !user) return;
    (async () => {
      try {
        const res = await runGetGroupsAsync({
          _start: groups.length,
          _end: groups.length + PAGE_SIZE,
          _sort: 'createdAt',
          _order: 'DESC',
          user_id: user.id,
        });
        if (res && res.data && (res.statusCode + '').startsWith('2')) {
          const { data, total } = res.data;
          setGroups([...groups, ...data]);
          setTotalGroups(total);
        } else {
          throw new Error('获取分组失败');
        }
      } catch (e) {
        setError(e as Error);
      }
    })();
  };

  const create: UseGroupReturnType['create'] = async (...args) => {
    try {
      const res = await runCreateGroupAsync(...args);
      if (res && res.data && (res.statusCode + '').startsWith('2')) {
        const group = res.data;
        setGroups([group, ...groups]);
        incTotalGroups();
        return group;
      }
      throw new Error('创建分组失败');
    } catch (e) {
      setError(e as Error);
      return null;
    }
  };

  const mutative: UseGroupReturnType['mutative'] = async (...args) => {
    try {
      const res = await runUpdateGroupAsync(...args);
      if (res && res.data && (res.statusCode + '').startsWith('2')) {
        const group = res.data;
        setGroups(groups.map(g => (g.id === group.id ? group : g)));
        return group;
      }
      throw new Error('更新分组失败');
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
            _end: PAGE_SIZE,
            _sort: 'createdAt',
            _order: 'DESC',
            user_id: user.id,
          });
          if (res && res.data && (res.statusCode + '').startsWith('2')) {
            const { data, total } = res.data;
            setGroups(data);
            setTotalGroups(total);
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
      mutative,
      hasMore: false,
      loadMore,
    };
  }
  return {
    groups,
    loading,
    error: error?.message ?? '',
    create,
    mutative,
    hasMore: totalGroups > groups.length,
    loadMore,
  };
}
