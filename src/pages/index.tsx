import { Spin } from "antd";
import { Suspense, lazy } from "react";

const LazyLayout = (importStatement: () => Promise<any>) => {
  const Component = lazy(importStatement);

  return (
    <Suspense fallback={<Spin />}>
      <Component />
    </Suspense>
  );
};

export const LoginPage = () => LazyLayout(() => import("./login/login"));
export const DashboardPage = () =>
  LazyLayout(() => import("./dashboard/dashboard"));
export const QuotationPage = () =>
  LazyLayout(() => import("./quotation/quotation"));
