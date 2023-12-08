import { Fragment, memo } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AppRoutes from "../routers/app-router";

type Props = {
  isAuthRoute?: boolean;
  layout?: any;
  isPrivate?: boolean;
};

export const PrivateRoute = memo(
  ({ isAuthRoute, layout: Layout = Fragment, isPrivate }: Props) => {
    // const { isLoggedIn } = useAuth();
    const isLoggedIn = false;

    if (isAuthRoute && isLoggedIn) {
      return <Navigate to={AppRoutes.dashboard} replace />;
    }

    if (isPrivate && !isLoggedIn) {
      return <Navigate to={AppRoutes.auth.login} replace />;
    }

    return (
      <Layout>
        <Outlet />
      </Layout>
    );
  }
);
