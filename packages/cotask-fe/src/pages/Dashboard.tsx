import { PlusOutlined } from '@ant-design/icons';
import GroupList from '@cotask-fe/modules/group/components/GroupList';
import { useGroup } from '@cotask-fe/modules/group/hooks';
import TodoList from '@cotask-fe/modules/todo/components/TodoList';
import { useTodo, useTypedTodos } from '@cotask-fe/modules/todo/hooks';
import CotaskCard from '@cotask-fe/shared/components/CotaskCard';
import CotaskLogo from '@cotask-fe/shared/components/CotaskLogo';
import { Group } from '@cotask/types';
import { Button, Layout, theme, Typography } from 'antd';
import { useState } from 'react';

const { Sider, Header, Content, Footer } = Layout;

const siderStyle: React.CSSProperties = {
  height: '100vh',
  position: 'fixed',
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
};

export default function Dashboard() {
  const { groups, loading: groupsLoading, error: groupsError } = useGroup();
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [selectedType, setSelectedType] = useState<'today' | 'all' | null>('today');
  const { todos: typedTodos } = useTypedTodos(selectedType);
  const { todos } = useTodo(selectedGroup);
  const showTodos = selectedType === null ? todos : typedTodos;
  const {
    token: { colorBgContainer, colorFillContent },
  } = theme.useToken();

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider
        width={280}
        style={{
          ...siderStyle,
          background: colorBgContainer,
          padding: 20,
        }}
      >
        <Layout
          style={{
            backgroundColor: colorBgContainer,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Header style={{ display: 'flex', justifyContent: 'center' }}>
            <CotaskLogo size='small' />
          </Header>
          <Content
            style={{
              flex: 1,
              overflow: 'scroll',
              scrollbarWidth: 'none',
            }}
          >
            <div
              style={{
                display: 'grid',
                gap: '12px',
                padding: '8px',
              }}
            >
              <CotaskCard
                title='我的'
                content='3项待完成'
                active={selectedType === 'today'}
                onClick={() => {
                  setSelectedType('today');
                  setSelectedGroup(null);
                }}
              />
              <CotaskCard
                title='全部'
                content='12项待完成'
                active={selectedType === 'all'}
                onClick={() => {
                  setSelectedType('all');
                  setSelectedGroup(null);
                }}
              />
            </div>
            <GroupList
              groups={groups}
              loading={groupsLoading}
              error={groupsError}
              onClick={group => {
                setSelectedGroup(group);
                setSelectedType(null);
              }}
              hasMore={false}
              loadMore={() => {
                console.log('loadMore');
              }}
            />
          </Content>
          <Footer
            style={{
              backgroundColor: colorBgContainer,
              paddingLeft: 0,
              paddingRight: 0,
              marginTop: 'auto',
            }}
          >
            <Button
              icon={<PlusOutlined />}
              onClick={() => {
                /** TODO: 创建新的Group */
              }}
              type='dashed'
              size='large'
              style={{ width: '100%' }}
            >
              新建群组
            </Button>
          </Footer>
        </Layout>
      </Sider>
      <Layout style={{ backgroundColor: colorBgContainer, marginInlineStart: 280 }}>
        <Header style={{ paddingLeft: 20, backgroundColor: colorBgContainer }}>
          <Typography.Title level={2}>当前群组任务</Typography.Title>
        </Header>
        <Content
          style={{
            margin: '32px 16px',
            padding: 24,
            backgroundColor: colorFillContent,
            borderRadius: 8,
            overflow: 'scroll',
            scrollbarWidth: 'none',
          }}
        >
          <TodoList
            todos={showTodos}
            title={
              selectedGroup !== null
                ? selectedGroup.name
                : selectedType === 'today'
                  ? '今日'
                  : '全部'
            }
            onDelete={() => {}}
            onComplete={() => {}}
            onEdit={() => {}}
            loadMore={() => {}}
            hasMore={false}
          />
        </Content>
      </Layout>
    </Layout>
  );
}
