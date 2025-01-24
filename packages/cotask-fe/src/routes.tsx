import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './shared/routes/ProtectedRoute';

const routers = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<ProtectedRoute />}>
      <Route path='/' element={<Dashboard />}></Route>
      <Route path='/auth' element={<AuthPage />} />
    </Route>
  )
);

export default routers;
