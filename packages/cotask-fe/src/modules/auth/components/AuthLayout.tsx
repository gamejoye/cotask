import { ConfigProvider, Layout } from "antd";

const { Header, Content, Footer } = Layout;

const logoStyle = {
  width: '64px',
  height: '64px',
  backgroundImage: `url('/cotask.png')`,
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  marginRight: '16px',
};

export type Props = { children: React.ReactNode };

export default function AuthLayout({ children }: Props) {
  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            headerBg: '#fff',
          },
        },
      }}
    >
      <Layout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header style={{ display: 'flex', alignItems: 'center', height: '64px' }}>
          <div style={logoStyle} />
          <h1>Cotask</h1>
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
    </ConfigProvider>
  );
}