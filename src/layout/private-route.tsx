import { Fragment, memo } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AppRoutes from '../routers/app-router';
import { useAuth } from '../contexts';

type Props = {
  isAuthRoute?: boolean;
  layout?: any;
  isPrivate?: boolean;
};

export const PrivateRoute = memo(({ isAuthRoute, layout: Layout = Fragment, isPrivate }: Props) => {
  const { isLoggedIn } = useAuth();

  if (isAuthRoute && isLoggedIn) {
    return <Navigate to={AppRoutes.dashboard.value} replace />;
  }

  if (isPrivate && !isLoggedIn) {
    return <Navigate to={AppRoutes.auth.login} replace />;
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
});
