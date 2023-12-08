import { createBrowserRouter } from "react-router-dom";
import AppRoutes from "./app-router";
import { DashboardPage, LoginPage, QuotationPage } from "../pages";
import { PrivateRoute } from "../layout/private-route";
import MainLayout from "../layout/main-layout";

const useRouter = () => {
  return createBrowserRouter([
    {
      path: AppRoutes.auth.index,
      children: [
        {
          path: AppRoutes.auth.login,
          element: <LoginPage />,
        },
      ],
    },
    {
      path: AppRoutes.home,
      element: <PrivateRoute layout={MainLayout} />,
      children: [
        {
          path: AppRoutes.dashboard.value,
          element: <DashboardPage />,
        },
        {
          path: AppRoutes.quotation.value,
          element: <QuotationPage />,
        },
      ],
    },
  ]);
};

export default useRouter;
