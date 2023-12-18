import { memo, useMemo } from 'react';
import { AppLocation } from '../../components';
import AppRoutes from '../../routers/app-router';
import { Button, Input, Popconfirm, Space, Spin, Table } from 'antd';
import { DefaultPagination, showNotification } from '../../utils';
import { ColumnsType } from 'antd/es/table';
import EditIcon from '../../assets/icons/action-edit-table.svg?react';
import Edit2Icon from '../../assets/icons/action-table.svg?react';
import SearchLogo from '../../assets/icons/search.svg?react';
import { useNavigate } from 'react-router-dom';
import { useFindAllTemplatesQuery } from '../../graphql/queries/findAllTemplates.generated';
import { useRemoveTemplateMutation } from '../../graphql/mutations/removeTemplate.generated';

const Template = memo(() => {
  const navigate = useNavigate();

  const [removeAsync, { loading: removing }] = useRemoveTemplateMutation({
    onCompleted() {
      showNotification('success', 'Remove new template success!');
      refetch();
    },
    onError(error) {
      showNotification('error', 'Remove faild', error.message);
    },
  });

  const { data, loading: getting, error, refetch } = useFindAllTemplatesQuery({ fetchPolicy: 'cache-and-network' });

  const templates = useMemo(() => data?.findAllTemplates ?? [], [data]);

  const loading = useMemo(() => getting || removing, [getting, removing]);

  const columns: ColumnsType<any> = useMemo(
    () => [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        width: '5%',
        align: 'center',
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: '5%',
        align: 'center',
      },

      {
        title: 'Action',
        dataIndex: 'id',
        key: 'id',
        width: '8%',
        align: 'center',
        render: (id: string) => {
          return (
            <Space>
              <span
                className="hover:cursor-pointer"
                onClick={() => {
                  navigate(AppRoutes.template.detail.id(id));
                }}>
                <EditIcon />
              </span>
              <Popconfirm
                title="Delete the template"
                description="Are you sure to delete this template?"
                onConfirm={() => {
                  removeAsync({
                    variables: {
                      id,
                    },
                  });
                }}
                okText="Yes"
                okButtonProps={{
                  type: 'primary',
                  className: 'bg-greens-normal',
                }}
                cancelText="No">
                <Edit2Icon />
              </Popconfirm>
            </Space>
          );
        },
      },
    ],
    [navigate, removeAsync],
  );

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
                  navigate(AppRoutes.template.create);
                }}>
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
            </Space>
          }
        />
        <div className="pt-32px">
          <Table
            size="small"
            columns={columns}
            dataSource={templates}
            pagination={{
              ...DefaultPagination,
              // onChange: onChangePage,
              // current: Number(filter?.page),
              total: templates.length,
            }}
            scroll={{ y: 'calc(100vh - 320px)' }}
            rowKey={'id'}
            bordered
          />
        </div>
      </div>
    </Spin>
  );
});

export default Template;
