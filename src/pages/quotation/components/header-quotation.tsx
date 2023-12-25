import { memo, useState } from 'react';
import { Button, Input, Space } from 'antd';
import SearchLogo from '../../../assets/icons/search.svg?react';
import { CreateQuote } from '.';
import React from 'react';


interface HeaderQuotationProps {
  fetchQuotes: () => void;
  fetchAllQuotes: () => void;
}

const HeaderQuotation: React.FC<HeaderQuotationProps> = memo(({ fetchQuotes, fetchAllQuotes }) => {
  const [openModalCreate, setOpenModalCreate] = useState(false);

 

  return (
    <Space>
      <Button className="bg-greens-light border-none hover:border hover:border-solid hover:border-greens-normal" onClick={() => {
          fetchAllQuotes(); 
        }}>
        All
      </Button>
      <Button className="text-grey-900 " onClick={() => {
          fetchQuotes(); 
        }}>Pending</Button>
      <Input size="middle" className="min-w-[320px] h-40px" suffix={<SearchLogo />} placeholder="Search" />
      <Button
        type="primary"
        className="bg-greens-normal hover:bg-greens-hover"
        onClick={() => setOpenModalCreate(true)}>
        <Space>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M12.0303 5L12.012 19"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M5 12H19" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Add new
        </Space>
      </Button>
      {openModalCreate && <CreateQuote open={openModalCreate} setOpen={setOpenModalCreate} />}
    </Space>
  );
});

export default HeaderQuotation;
