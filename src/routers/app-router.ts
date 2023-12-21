const AppRoutes = {
  home: '/',
  admin: '/admin',
  dashboard: {
    label: 'Dashboard',
    value: '/admin/dashboard',
  },
  quotation: {
    label: 'Quotation',
    value: '/admin/quotation',
    detail: {
      value: '/admin/quotation/:id',
      id: (id: string | number) => '/admin/quotation/' + id,
    },
  },
  template: {
    label: 'Template',
    value: '/admin/template',
    create: '/admin/template/create',
    detail: {
      value: '/admin/template/:id',
      id: (id: string) => '/admin/template/' + id,
    },
  },
  notFound: '/404',
  auth: {
    index: '/auth',
    login: '/login',
  },
};

export default AppRoutes;
