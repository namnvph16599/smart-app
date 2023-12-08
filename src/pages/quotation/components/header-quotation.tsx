import { memo, useState } from "react";
import { Button, Input, Space } from "antd";
import SearchLogo from "../../../assets/icons/search.svg?react";
import { CreateQuote } from ".";

const HeaderQuotation = memo(() => {
  const [openModalCreate, setOpenModalCreate] = useState(false);
  return (
    <Space>
      <Input
        size="middle"
        className="min-w-[320px] h-40px"
        suffix={<SearchLogo />}
        placeholder="Search"
      />
      <Button
        type="primary"
        className="h-40px bg-greens-normal hover:bg-greens-hover"
        onClick={() => setOpenModalCreate(true)}
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
      {openModalCreate && (
        <CreateQuote open={openModalCreate} setOpen={setOpenModalCreate} />
      )}
    </Space>
  );
});

export default HeaderQuotation;
