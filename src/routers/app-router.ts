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
      id: (id: string | number) => "/quotation/" + id,
    },
  },
  template: {
    label: "Template",
    value: "/template",
    create: "/template/create",
    detail: {
      value: "/template/:id",
      id: (id: string) => "/template/" + id,
    },
  },
  notFound: "/404",
  auth: {
    index: "/auth",
    login: "/auth/login",
  },
};

export default AppRoutes;
