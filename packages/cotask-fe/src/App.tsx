import { RouterProvider } from 'react-router-dom';
import routers from './routes';
import { ConfigProvider } from 'antd';

export default function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorFillContent: '#F9FAFB',
        },
        components: {
          Layout: {
            headerBg: '#fff',
          },
        },
      }}
    >
      <RouterProvider router={routers} />
    </ConfigProvider>
  );
}
