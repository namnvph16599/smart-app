import type { TablePaginationConfig } from "antd";

export const DefaultPagination: TablePaginationConfig = {
  position: ["bottomRight"],
  size: "default",
  locale: { items_per_page: " / page" },
  defaultPageSize: 10,
  showQuickJumper: true,
  showTotal: (total, range) => {
    return `${range[0]}-${range[1]} of ${total}`;
  },
};
