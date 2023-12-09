import { createBrowserRouter } from "react-router-dom";
import AppRoutes from "./app-router";
import {
  DashboardPage,
  LoginPage,
  QuotationDetailPage,
  QuotationPage,
  TemplateDetailPage,
  TemplatePage,
} from "../pages";
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
          path: AppRoutes.home,
          element: <QuotationPage />,
        },
        {
          path: AppRoutes.dashboard.value,
          element: <DashboardPage />,
        },
        {
          path: AppRoutes.quotation.value,
          element: <QuotationPage />,
        },
        {
          path: AppRoutes.quotation.detail.value,
          element: <QuotationDetailPage />,
        },
        {
          path: AppRoutes.template.value,
          element: <TemplatePage />,
        },
        {
          path: AppRoutes.template.create,
          element: <TemplateDetailPage />,
        },
      ],
    },
  ]);
};

export default useRouter;
