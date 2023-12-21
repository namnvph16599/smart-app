import { createBrowserRouter } from 'react-router-dom';
import AppRoutes from './app-router';
import {
  CodePage,
  DashboardPage,
  HomePage,
  LoginPage,
  QuotationDetailPage,
  QuotationPage,
  TemplateCreatePage,
  TemplateDetailPage,
  TemplatePage,
} from '../pages';
import { PrivateRoute } from '../layout/private-route';
import MainLayout from '../layout/main-layout';

const useRouter = () => {
  return createBrowserRouter([
    {
      path: AppRoutes.home,
      element: <PrivateRoute isAuthRoute isPrivate={false} />,
      children: [
        {
          path: AppRoutes.home,
          element: <HomePage />,
        },
        {
          path: AppRoutes.auth.login,
          element: <LoginPage />,
        },
        {
          path: '/authorizationcode',
          element: <CodePage />,
        },
      ],
    },

    {
      path: AppRoutes.admin,
      element: <PrivateRoute layout={MainLayout} isPrivate />,
      children: [
        {
          path: AppRoutes.admin,
          element: <DashboardPage />,
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
          element: <TemplateCreatePage />,
        },
        {
          path: AppRoutes.template.detail.value,
          element: <TemplateDetailPage />,
        },
      ],
    },
  ]);
};

export default useRouter;
