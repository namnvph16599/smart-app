import React, { memo } from "react";
import { Button, Input, Space } from "antd";
import SearchSvg from "../../../assets/icons/search.svg";

type Props = {};

const HeaderQuotation = memo((props: Props) => {
  return (
    <Space>
      <Input
        size="middle"
        className="min-w-[320px] h-40px"
        suffix={<img src={SearchSvg} alt="Search" />}
        placeholder="Search"
      />
      <Button
        type="primary"
        className="h-40px bg-greens-normal hover:bg-greens-hover"
      >
        <Space className="h-32px">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12.0303 5L12.012 19"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M5 12H19"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Add new
        </Space>
      </Button>
    </Space>
  );
});

export default HeaderQuotation;