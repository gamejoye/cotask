import { Group } from '@cotask-fe/shared/models';
import { Avatar, Dropdown, List, MenuProps, Typography } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';

type DOMId = string;

export type Props = {
  groups: Group[];
  hasMore: boolean;
  container: DOMId;
  onClick: (group: Group) => void;
  loadMore: () => void;
  onEdit: (group: Group) => void;
};

export default function GroupList({
  groups,
  onClick,
  loadMore,
  hasMore,
  onEdit,
  container,
}: Props) {
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
          <GroupItemRightClickMenu
            onEdit={() => {
              onEdit(group);
            }}
          >
            <List.Item key={group.id} onClick={() => onClick(group)}>
              <List.Item.Meta
                // TODO 列表图片
                avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
                title={group.name}
                description={group.description}
              />
              <Typography.Text type='secondary'>0{/** TODO 待办事件计数 */}</Typography.Text>
            </List.Item>
          </GroupItemRightClickMenu>
        )}
      />
    </InfiniteScroll>
  );
}

type RightClickMenuProps = {
  children: React.ReactNode;
  onEdit: () => void;
};

function GroupItemRightClickMenu({ children, onEdit }: RightClickMenuProps) {
  const items: MenuProps['items'] = [
    {
      label: '编辑',
      key: '1',
    },
  ];

  const onClick: MenuProps['onClick'] = ({ key }) => {
    if (key === '1') {
      onEdit();
    }
  };

  return (
    <Dropdown menu={{ items, onClick }} trigger={['contextMenu']}>
      {children}
    </Dropdown>
  );
}
