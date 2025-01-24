import { useAuth } from '@cotask-fe/modules/auth/hooks';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export default function ProtectedRoute() {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const isAuthPathname = location.pathname === '/auth';

  if (!isAuthenticated && !isAuthPathname) {
    return <Navigate to={'/auth'} replace />;
  }

  if (isAuthenticated && isAuthPathname) {
    return <Navigate to={'/'} replace />;
  }

  return <Outlet />;
}
