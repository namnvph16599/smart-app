import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AppLocation } from '../../components';
import AppRoutes from '../../routers/app-router';
import { Button, Col, Row, Space, Spin, Steps } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
// import { HotTable } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.css';
import Handsontable from 'handsontable';

//
import AddUserIcon from '../../assets/icons/add-user.svg?react';
import ArrowBottom from '../../assets/icons/arrow-bottom.svg?react';
import { TimelineQuote } from './components';
import ExcelToHandsontable, { ExcelToHandsontableRef } from '../sheet/HandsontableComponent';
import { useNavigate, useParams } from 'react-router-dom';
import { useFindOneSheetQuery } from '../../graphql/queries/findOneSheet.generated';
import { useCreateSheetMutation } from '../../graphql/mutations/createSheet.generated';
import { showNotification } from '../../utils';

//Or, to reduce the size of your JavaScript bundle, import only the modules that you need.
registerAllModules();

const StepLabel = memo(({ name }: { name: string }) => {
  return (
    <div className="block text-[16px] bg-greens-normal text-white font-medium leading-[14px] py-[8px] px-[8px] rounded-[6px]">
      {name}
    </div>
  );
});

const QuotaionDetail = memo(() => {
  const { id } = useParams();

  const excelToHandsontableRef = useRef<ExcelToHandsontableRef>(null);

  const navigate = useNavigate();
  const [openTimeline, setOpenTimeLine] = useState(false);

  const [data, setData] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);

  const [step, setStep] = useState(1);

  //  change id to step when onclick
  const { data: sheetData, loading: getting } = useFindOneSheetQuery({
    variables: { id: step },
    skip: !id,
  });

  const sheet = useMemo(() => sheetData?.findOneSheet, [sheetData]);
  console.log('sheet', sheet);

  // TODO: handle
  const [createSheetAsync, { loading: creating }] = useCreateSheetMutation({
    onCompleted() {
      // handle create sucess
    },
    onError(error) {
      showNotification('error', 'Create failed', error?.message);
    },
  });

  const handleCreateSheet = useCallback(() => {
    const handsontableData = excelToHandsontableRef.current?.getData();
    //console.log(handsontableData);

    if (handsontableData) {
     
        console.log(JSON.stringify(handsontableData));
        const input = {
        name: "googo",
        quotationId:"6579a54176def105b6d00dad",
        dynamicFields: handsontableData,
      };

        createSheetAsync({
          variables: {
            createSheetInput: input,
          },
        });
    }
}, [createSheetAsync]);

  const loading = useMemo(() => creating || getting, [creating, getting]);

  useEffect(() => {
    // Fetch data from the API
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((apiData) => {
        setData(apiData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

    // Fetch user data from the API to populate the dropdown list
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((apiUsers) => {
        setUsers(apiUsers);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);

  // Register a custom cell type for the select dropdown
  Handsontable.cellTypes.registerCellType('customDropdown', {
    editor: Handsontable.editors.AutocompleteEditor, // Use AutocompleteEditor for select dropdown behavior
    renderer: Handsontable.renderers.TextRenderer, // Use TextRenderer to display selected value
  });

  const userNames = users.map((user) => user.name);

  const columns: Handsontable.ColumnSettings[] = [
    {
      data: 'title',
      title: 'Title',
    },
    {
      data: 'userId',
      title: 'User',
      type: 'customDropdown', // Use the registered custom cell type
      source: userNames, // Populate the dropdown source with user names
    },
    {
      data: 'body',
      title: 'Body',
    },
  ];

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
              label: 'Quote',
            },
          ]}
          title="Quotation Detail"
          rightContent={
            <Space>
              <Button type="primary" className="bg-greens-light text-greens-normal" onClick={() => handleCreateSheet()}>
                <Space>
                  <AddUserIcon />
                  <span>Assign</span>
                  <ArrowBottom />
                </Space>
              </Button>
              <Button
                onClick={() => {
                  navigate(-1);
                }}>
                Cancel
              </Button>
              <Button type="primary" className="bg-greens-normal" onClick={() => handleCreateSheet()}>
                Save
              </Button>
            </Space>
          }
        />
        <div className="py-32px">
          <Steps
            current={2}
            labelPlacement="vertical"
            onChange={(current) => {
              setStep(current);
            }}
            items={[
              {
                title: <StepLabel name="Working recap" />,
              },
              {
                title: <StepLabel name="Initial volumes" />,
              },
              {
                title: <StepLabel name="Admin check" />,
              },
              {
                title: <StepLabel name="Pre-class" />,
              },
              {
                title: <StepLabel name="Phasing" />,
              },
              {
                title: <StepLabel name="Pack copy" />,
              },
              {
                title: <StepLabel name="Template" />,
              },
            ]}
          />
        </div>
        <Row gutter={30}>
          <Col span={24}>
            <div className="flex flex-row justify-end">
              <Button
                type="primary"
                className="bg-greens-light text-greens-normal"
                onClick={() => setOpenTimeLine(!openTimeline)}
                icon={!openTimeline ? <EyeOutlined /> : <EyeInvisibleOutlined />}
              />
            </div>
          </Col>
          <Col span={openTimeline ? 20 : 24}>
            <div style={{ width: '100%' }}>
              <ExcelToHandsontable openTimeline={openTimeline} ref={excelToHandsontableRef}/>
              {/* <HotTable
              data={data}
              columns={columns}
              stretchH="all"
              rowHeaders={true}
            />
            <HotTable
              data={[
                ["", "Tesla", "Volvo", "Toyota", "Ford"],
                ["2019", 10, 11, 12, 13],
                ["2020", 20, 11, 14, 13],
                ["2021", 30, 15, 12, 13],
              ]}
              width={"100%"}
              rowHeaders={true}
              colHeaders={true}
              licenseKey="non-commercial-and-evaluation" // for non-commercial use only
            /> */}
            </div>
          </Col>
          <Col span={openTimeline ? 4 : 0}>
            <TimelineQuote
              approveds={[
                {
                  approvedDate: new Date(),
                  actionLog: 'steven',
                },
                {
                  approvedDate: new Date(),
                  actionLog: 'steven',
                },
                {
                  approvedDate: new Date(),
                  actionLog: 'steven',
                },
                {
                  approvedDate: new Date(),
                  actionLog: 'steven',
                },
              ]}
            />
          </Col>
        </Row>
      </div>
    </Spin>
  );
});

export default QuotaionDetail;
