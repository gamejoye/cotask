import { Group } from '@cotask-fe/shared/models';
import { Avatar, List, Typography } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';

type DOMId = string;

export type Props = {
  groups: Group[];
  onClick: (group: Group) => void;
  loadMore: () => void;
  hasMore: boolean;
  container: DOMId;
};

export default function GroupList({ groups, onClick, loadMore, hasMore, container }: Props) {
  return (
    <InfiniteScroll
      dataLength={groups.length}
      next={loadMore}
      hasMore={hasMore}
      loader={
        <div
          style={{
            textAlign: 'center',
          }}
        >
          <Typography.Text type='secondary'>loading...</Typography.Text>
        </div>
      }
      endMessage={
        <div
          style={{
            textAlign: 'center',
          }}
        >
          <Typography.Text type='secondary'>没有更多群组了</Typography.Text>
        </div>
      }
      scrollableTarget={container}
    >
      <List
        dataSource={groups}
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
    </InfiniteScroll>
  );
}
