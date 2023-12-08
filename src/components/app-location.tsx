import { memo } from "react";
import { Link } from "react-router-dom";
import AppRoutes from "../routers/app-router";
import { RightOutlined } from "@ant-design/icons";

type Props = {
  title?: string;
  routes: { label: string; to?: string }[];
  rightContent?: JSX.Element;
  hiddenBackHome?: boolean;
};

export const AppLocation = memo(
  ({ title, routes, rightContent, hiddenBackHome = true }: Props) => {
    return (
      <div>
        {hiddenBackHome && (
          <div className="flex items-center h-[42px]">
            {routes?.map((route, idx) => (
              <span key={idx} className="text-[14px] leading-[16px]">
                <Link
                  key={idx}
                  to={route.to ?? AppRoutes.home}
                  className={"text-grey-500 hover:text-greens-normal"}
                >
                  {route.label}
                </Link>
                {idx < routes.length - 1 && (
                  <RightOutlined className="mx-[8px] text-[#91939D]" />
                )}
              </span>
            ))}
          </div>
        )}
        <div className="flex items-center justify-between">
          <h2 className="font-normal text-[22px] leading-[26px] text-grey-900">
            {title ? title : routes[routes?.length - 1].label}
          </h2>
          {rightContent}
        </div>
      </div>
    );
  }
);
