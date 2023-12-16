import { memo, useMemo } from 'react';
import { AppLocation } from '../../components';
import AppRoutes from '../../routers/app-router';
import { Button, Input, Space, Spin, Table } from 'antd';
import { DefaultPagination } from '../../utils';
import { ColumnsType } from 'antd/es/table';
import EditIcon from '../../assets/icons/action-edit-table.svg?react';
import Edit2Icon from '../../assets/icons/action-table.svg?react';
import SearchLogo from '../../assets/icons/search.svg?react';
import { useNavigate } from 'react-router-dom';
import { useFindAllTemplatesQuery } from '../../graphql/queries/findAllTemplates.generated';

const Template = memo(() => {
  const navigate = useNavigate();
  const columns: ColumnsType<any> = useMemo(
    () => [
      {
        title: 'ID',
        dataIndex: 'poNumber',
        key: 'poNumber',
        width: '5%',
        align: 'center',
      },
      {
        title: 'Name',
        dataIndex: 'customerItemNumber',
        key: 'customerItemNumber',
        width: '5%',
        align: 'center',
      },

      {
        title: 'Action',
        dataIndex: 'id',
        key: 'id',
        width: '8%',
        align: 'center',
        render: () => {
          return (
            <Space>
              <EditIcon />
              <Edit2Icon />
            </Space>
          );
        },
      },
    ],
    [],
  );

  const { data, loading, error } = useFindAllTemplatesQuery();
  console.log('data', data);

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <Spin spinning={loading}>
      <div className="bg-white px-[32px] custom-table">
        <AppLocation
          routes={[
            {
              label: 'Home',
              to: AppRoutes.home,
            },
            {
              label: 'Items',
            },
          ]}
          title="List"
          rightContent={
            <Space>
              <Input size="middle" className="min-w-[320px] h-40px" suffix={<SearchLogo />} placeholder="Search" />
              <Button
                type="primary"
                className="bg-greens-normal hover:bg-greens-hover"
                onClick={() => {
                  // navigate
                  navigate(AppRoutes.template.create);
                }}>
                <Space>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
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
          }
        />
        <div className="pt-32px">
          {/* <Table
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
            scroll={{ y: 'calc(100vh - 320px)' }}
            rowKey={'id'}
            bordered
          /> */}
        </div>
      </div>
    </Spin>
  );
});

export default Template;
