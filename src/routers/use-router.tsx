import { createBrowserRouter } from "react-router-dom";
import AppRoutes from "./app-router";
import { DashboardPage, LoginPage } from "../pages";

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
      children: [
        {
          path: AppRoutes.dashboard,
          element: <DashboardPage />,
        },
      ],
    },
  ]);
};

export default useRouter;
