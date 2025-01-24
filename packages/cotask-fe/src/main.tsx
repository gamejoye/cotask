import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import routers from './routes';
import { StrictMode } from 'react';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={routers} />
  </StrictMode>
);
