import { memo, useMemo } from "react";
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

enum StatusEnum {
  Lf = "Lf",
  Buyer = "Buyer",
  Supplier = "Supplier",
}

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
];

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
        dataIndex: "customerItemNumber",
        key: "customerItemNumber",
        width: "5%",
        align: "center",
      },
      {
        title: "Category",
        dataIndex: "itemCategory",
        key: "itemCategory",
        width: "10%",
        align: "center",
      },
      {
        title: "Supplier name",
        dataIndex: "supplierName",
        key: "supplierName",
        align: "center",
      },

      {
        title: "Quotation",
        children: [
          {
            title: "Stage",
            dataIndex: "developmentStatus",
            key: "developmentStatus",
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
        render: () => {
          return (
            <Space>
              <span
                className="hover:cursor-pointer"
                onClick={() => {
                  navigate(AppRoutes.quotation.detail.id(1));
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
        rightContent={<HeaderQuotation />}
      />
      <div className="pt-32px">
        <Table
          size="small"
          // loading={isLoading}
          columns={columns}
          dataSource={data}
          pagination={{
            ...DefaultPagination,
            // onChange: onChangePage,
            // current: Number(filter?.page),
            total: data?.length,
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
