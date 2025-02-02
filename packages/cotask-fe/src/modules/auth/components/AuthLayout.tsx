import CotaskLogo from '@cotask-fe/shared/components/CotaskLogo';
import { Layout } from 'antd';

const { Header, Content, Footer } = Layout;

export type Props = { children: React.ReactNode };

export default function AuthLayout({ children }: Props) {
  return (
    <Layout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header style={{ display: 'flex', alignItems: 'center', height: '64px' }}>
        <CotaskLogo />
      </Header>
      <Content
        style={{
          flex: 1,
          padding: '24px 48px',
        }}
      >
        {children}
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
}
