import { Link, Outlet, useLocation } from "react-router-dom";
import { Avatar, Button, Layout, Popover } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { memo, useEffect, useState } from "react";
import AppRoutes from "../routers/app-router";
import Logo from "../assets/images/header-icon.png";

const MENUS = [
  {
    label: AppRoutes.dashboard.label,
    value: AppRoutes.dashboard.value,
  },
  {
    label: AppRoutes.quotation.label,
    value: AppRoutes.quotation.value,
  },
  {
    label: AppRoutes.template.label,
    value: AppRoutes.template.value,
  },
];

const MainLayout = memo(() => {
  const location = useLocation();
  const [active, setActive] = useState(AppRoutes.dashboard.value);

  useEffect(() => {
    // const pathname = location?.pathname;
    // if (pathname && pathname !== "/") {
    //   const existParentRouter = MENUS.find((m) => m.value === pathname);
    //   if (existParentRouter) {
    //     setActive(pathname);
    //     return;
    //   }
    //   ROUTERS_CHILDREN.forEach((r) => {
    //     if (pathname.startsWith(r)) {
    //       setActive(r);
    //       if (Menus_Administration.find((it) => it?.value == r)) {
    //         setActive(APP_ROUTER.ADMIN.LIST);
    //         setSubRouterActive(r);
    //       }
    //       return;
    //     }
    //   });
    // } else {
    //   setActive(APP_ROUTER.DASHBOARD);
    // }
  }, [location]);

  return (
    <Layout>
      <header className="bg-white flex justify-between items-center h-[66px] py-4px px-[32px] border-b border-grayscale-border sha">
        <Link to={AppRoutes.dashboard.value}>
          <img src={Logo} alt="Smart App" />
        </Link>
        <nav className="bg-white flex flex-wrap items-center">
          <ul className="flex items-center">
            {MENUS.map(({ label, value }) => {
              return (
                <Link
                  key={value}
                  onClick={() => {
                    setActive(value);
                  }}
                  to={value}
                  className="ml-[24px]"
                >
                  <span
                    className={`font-medium text-14px leading-18px ${
                      active === value ? "text-greens-normal" : "text-grey-900"
                    }`}
                  >
                    {label}
                  </span>
                </Link>
              );
            })}
            {/* {!!permisson?.isAdmin ? (
              <Popover
                content={
                  <div>
                    {Menus_Administration.map(({ label, value }) => {
                      return (
                        <div className="hover:bg-[#f9f9f9]" key={value}>
                          <Button
                            type="link"
                            onClick={() => {
                              setSubRouterActive(value);
                              setActive(APP_ROUTER.ADMIN.LIST);
                              navigate(value);
                            }}
                          >
                            <span
                              className={` font-medium text-16px leading-18px ${
                                subRouterActive === value
                                  ? "text-grayscale-black"
                                  : "text-grayscale-default"
                              }`}
                            >
                              {label}
                            </span>
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                }
                placement="bottom"
              >
                <span
                  onClick={() => setActive(APP_ROUTER.ADMIN.LIST)}
                  className={` font-medium text-16px ${
                    active === APP_ROUTER.ADMIN.LIST
                      ? "text-grayscale-black"
                      : "text-grayscale-default"
                  }`}
                >
                  Administration
                </span>
              </Popover>
            ) : null} */}
          </ul>
          <Popover
            content={
              <div>
                <div className="hover:bg-[#f9f9f9]">
                  <Button type="link">
                    <span className="text-grayscale-black">Logout</span>
                  </Button>
                </div>
              </div>
            }
            placement="bottom"
          >
            <div className="flex items-center group ml-[64px] hover:cursor-pointer">
              <Avatar size={30} icon={<UserOutlined />} />
              <span className="font-medium text-14px leading-18px text-grey-900 pl-8px">
                thinh@gmail.com
              </span>
            </div>
          </Popover>
        </nav>
      </header>
      <div>
        <Outlet />
      </div>
    </Layout>
  );
});

export default MainLayout;
