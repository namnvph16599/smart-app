import { Spin } from 'antd';
import { Suspense, lazy } from 'react';

const LazyLayout = (importStatement: () => Promise<any>) => {
  const Component = lazy(importStatement);

  return (
    <Suspense fallback={<Spin className="w-full h-full flex justify-center items-center" />}>
      <Component />
    </Suspense>
  );
};

export const LoginPage = () => LazyLayout(() => import('./login/login'));
export const DashboardPage = () => LazyLayout(() => import('./dashboard/dashboard'));
export const QuotationPage = () => LazyLayout(() => import('./quotation/quotation'));
export const QuotationDetailPage = () => LazyLayout(() => import('./quotation/detail'));
export const TemplateDetailPage = () => LazyLayout(() => import('./template/template-detail'));
export const TemplatePage = () => LazyLayout(() => import('./template/template'));
export const TemplateCreatePage = () => LazyLayout(() => import('./template/template-create'));
