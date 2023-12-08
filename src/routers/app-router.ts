const AppRoutes = {
  home: "/",
  dashboard: {
    label: "Dashboard",
    value: "/dashboard",
  },
  quotation: {
    label: "Quotation",
    value: "/quotation",
    detail: {
      value: "/quotation/:id",
      id: (id: string) => "/quotation/" + id,
    },
  },
  template: {
    label: "Template",
    value: "/template",
  },
  notFound: "/404",
  auth: {
    index: "/auth",
    login: "/auth/login",
  },
};

export default AppRoutes;
