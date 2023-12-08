import { lazy } from "react";

export const LoginPage = lazy(() => import("./login/login"));
export const DashboardPage = lazy(() => import("./dashboard/dashboard"));
export const QuotationPage = lazy(() => import("./quotation/quotation"));
