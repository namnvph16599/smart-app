import { memo, useEffect, useMemo, useState } from "react";
import { AppLocation } from "../../components";
import AppRoutes from "../../routers/app-router";
import HeaderQuotation from "./components/header-quotation";
import Table, { ColumnsType } from "antd/es/table";
import { Space } from "antd";
import { DefaultPagination } from "../../utils";
import EditIcon from "../../assets/icons/action-edit-table.svg?react";
import Edit2Icon from "../../assets/icons/action-table.svg?react";

import "./style.css";
import { useNavigate } from "react-router-dom";
import { useFindAllQuotesQuery } from "../../graphql/queries/findAllQuotes.generated";
import { useFindAllQuotesByStatusQuery } from "../../graphql/queries/findAllQuotesByStatus.generated";
import { STORAGE_KEYS } from "../../constants";

enum StatusEnum {
  Lf = "lfmr",
  Buyer = "customer",
  Supplier = "vendor",
}

/*
const data: any = [
  {
    poNumber: 1,
    status: StatusEnum.Lf,
  },
  {
    poNumber: 2,
    status: StatusEnum.Buyer,
  },
  {
    poNumber: 3,
    status: StatusEnum.Supplier,
  },
];*/



const Quotation = memo(() => {
  const navigate = useNavigate();
  const columns: ColumnsType<any> = useMemo(
    () => [
      {
        title: "PO No.",
        dataIndex: "poNumber",
        key: "poNumber",
        width: "5%",
        align: "center",
      },
      {
        title: "Item No.",
        dataIndex: "itemNumber",
        key: "itemNumber",
        width: "5%",
        align: "center",
      },
      {
        title: "Category",
        dataIndex: "category",
        key: "category",
        width: "10%",
        align: "center",
      },
      {
        title: "Supplier name",
        dataIndex: "supplier",
        key: "supplier",
        align: "center",
      },

      {
        title: "Quotation",
        children: [
          {
            title: "Stage",
            dataIndex: "stage",
            key: "stage",
            align: "center",
            width: "10%",
          },
          {
            title: "Status",
            dataIndex: "status",
            key: "status",
            align: "center",
            width: "10%",
            render: (status) => {
              return (
                <div className="my-[8px]">
                  <div
                    className={`h-[34px] rounded-full inline px-[28px] py-[4px] leading-[18px] text-[14px]
                    ${
                      status === StatusEnum.Lf
                        ? "bg-status-lf-bg"
                        : status === StatusEnum.Buyer
                        ? "bg-status-buyer-bg"
                        : "bg-status-supplier-bg"
                    }
                    ${
                      status === StatusEnum.Lf
                        ? "text-status-lf-text"
                        : status === StatusEnum.Buyer
                        ? "text-status-buyer-text"
                        : "text-status-supplier-text"
                    }`}
                  >
                    {status}
                  </div>
                </div>
              );
            },
          },
        ],
      },
      {
        title: "Action",
        dataIndex: "id",
        key: "id",
        width: "8%",
        align: "center",
        render: (id) => {
          return (
            <Space>
              <span
                className="hover:cursor-pointer"
                onClick={() => {
                  navigate(AppRoutes.quotation.detail.id(id));
                }}
              >
                <EditIcon />
              </span>
              <Edit2Icon />
            </Space>
          );
        },
      },
    ],
    [navigate]
  );

  const { data, loading: getting, error, refetch } = useFindAllQuotesQuery({ fetchPolicy: 'cache-and-network' });

  const name = localStorage.getItem(STORAGE_KEYS.name);
  
  const { data:dataPending } = useFindAllQuotesByStatusQuery({ variables:{
    status:name ? name : ''
  } });


  const [quotes, setQuotes] = useState([]);
  //const quotes = useMemo(() => data?.findAllQuotes ?? [], [data]);

  const loading = useMemo(() => getting, [getting]);

  useEffect(() => {
    // Use useMemo to set the quotes state only when data changes
    setQuotes(data?.findAllQuotes ?? []);
  }, [data]);

  
   const fetchQuotes = () => {
    setQuotes(dataPending?.findAllQuotesByStatus ?? []);
  };

  const fetchAllQuotes = () => {
    setQuotes(data?.findAllQuotes ?? []);
  };


  return (
    <div className="bg-white px-[32px] custom-table">
      <AppLocation
        routes={[
          {
            label: "Home",
            to: AppRoutes.home,
          },
          {
            label: "Items",
          },
        ]}
        title="Quotation"
        rightContent={<HeaderQuotation fetchQuotes={fetchQuotes} fetchAllQuotes={fetchAllQuotes} />}
      />
      <div className="pt-32px">
        <Table
          size="small"
          // loading={isLoading}
          columns={columns}
          dataSource={quotes}
          pagination={{
            ...DefaultPagination,
            // onChange: onChangePage,
            // current: Number(filter?.page),
            total: quotes?.length,
          }}
          scroll={{ y: "calc(100vh - 320px)" }}
          rowKey={"id"}
          bordered
        />
      </div>
    </div>
  );
});

export default Quotation;
