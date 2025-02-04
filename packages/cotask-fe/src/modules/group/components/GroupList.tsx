import { Group } from '@cotask-fe/shared/models';
import { Avatar, Button, List, Result, Typography } from 'antd';

export type Props = {
  groups: Group[];
  loading: boolean;
  error: string;
  onClick: (group: Group) => void;
  loadMore: () => void;
  hasMore: boolean;
  retry?: () => void;
};

export default function GroupList({ groups, loading, error, onClick, retry }: Props) {
  if (error) {
    return (
      <div style={{ width: '100%' }}>
        <Result
          status='error'
          title='获取团队列表失败'
          subTitle={error}
          extra={[
            <Button type='dashed' key='retry' onClick={() => retry && retry()}>
              重试
            </Button>,
          ]}
        />
      </div>
    );
  }
  return (
    <List
      dataSource={groups}
      style={{ width: '100%' }}
      loading={loading}
      locale={{
        emptyText: '团队列表为空',
      }}
      header={<Typography.Text type='secondary'>我的列表</Typography.Text>}
      renderItem={(group, index) => (
        <List.Item key={group.id} onClick={() => onClick(group)}>
          <List.Item.Meta
            // TODO 列表图片
            avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
            title={group.name}
            description={group.description}
          />
          <Typography.Text type='secondary'>0{/** TODO 待办事件计数 */}</Typography.Text>
        </List.Item>
      )}
    />
  );
}
