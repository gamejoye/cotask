import GroupList from '@cotask-fe/modules/group/components/GroupList';
import { useGroup } from '@cotask-fe/modules/group/hooks';
import TodoList from '@cotask-fe/modules/todo/components/TodoList';
import { useTodo } from '@cotask-fe/modules/todo/hooks';
import CotaskCard from '@cotask-fe/shared/components/CotaskCard';
import { Group } from '@cotask/types';
import { Divider, Layout, theme } from 'antd';
import { useState } from 'react';

const { Sider, Header, Content } = Layout;

export default function Dashboard() {
  const { groups, loading: groupsLoading, error: groupsError } = useGroup();
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const { todos } = useTodo(selectedGroup);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider
        width={280}
        style={{
          background: colorBgContainer,
          padding: 20,
        }}
      >
        <div
          style={{
            display: 'grid',
            gap: '12px',
          }}
        >
          <CotaskCard title='我的' content='3项待完成' active onClick={() => {}} />
          <CotaskCard title='全部' content='12项待完成' onClick={() => {}} />
        </div>
        <Divider />
        <GroupList
          groups={groups}
          loading={groupsLoading}
          error={groupsError}
          onClick={group => {
            setSelectedGroup(group);
          }}
          hasMore={false}
          loadMore={() => {
            console.log('loadMore');
          }}
        />
      </Sider>
      <Layout>
        <Header style={{ paddingLeft: 20, backgroundColor: colorBgContainer }}>
          <div style={{ fontSize: 24, fontWeight: 600 }}>当前群组任务</div>
        </Header>
        <Content
          style={{
            margin: '0px 16px',
            padding: 24,
          }}
        >
          {selectedGroup ? (
            <TodoList
              todos={todos}
              group={selectedGroup}
              onDelete={() => {}}
              onComplete={() => {}}
              onEdit={() => {}}
              loadMore={() => {}}
              hasMore={false}
            />
          ) : null}
        </Content>
      </Layout>
    </Layout>
  );
}
