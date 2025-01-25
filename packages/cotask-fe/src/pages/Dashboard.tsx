import GroupList from '@cotask-fe/modules/group/components/GroupList';
import { useGroup } from '@cotask-fe/modules/group/hooks';
import CotaskCard from '@cotask-fe/shared/components/CotaskCard';
import { Divider, Layout, theme } from 'antd';

const { Sider, Header, Content } = Layout;

export default function Dashboard() {
  const { groups, loading, error } = useGroup();
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
          loading={loading}
          error={error}
          onClick={group => {
            console.log('click', group);
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
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          Content
        </Content>
      </Layout>
    </Layout>
  );
}
