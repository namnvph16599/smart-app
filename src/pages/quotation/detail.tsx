import { SetStateAction, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AppLocation } from '../../components';
import AppRoutes from '../../routers/app-router';
import { Button, Col, Dropdown, Menu, Row, Space, Spin, Steps, message } from 'antd';
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
import { STORAGE_KEYS } from '../../constants';
import { useUpdatesheetMutation } from '../../graphql/mutations/updatesheet.generated';
import { useUpdateQuotationStageAndStatusMutation } from '../../graphql/mutations/updateQuotationStageAndStatus.generated';

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

  const excelToHandsontableRef = useRef<ExcelToHandsontableRef>(null);

  const navigate = useNavigate();
  const [openTimeline, setOpenTimeLine] = useState(false);

  const [data, setData] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);

  const [step, setStep] = useState(0);

  const [receiver, setReceiver] = useState("");

  //  change id to step when onclick
 
  const { id:quoteId } = useParams();


  // TODO: handle
  const [createSheetAsync, { loading: creating }] = useCreateSheetMutation({
    onCompleted() {
      // handle create sucess
    },
    onError(error) {
      showNotification('error', 'Create failed', error?.message);
    },
  });

  const [updateSheetAsync, { loading: updating }] = useUpdatesheetMutation({
    onCompleted() {
      // handle create sucess
    },
    onError(error) {
      showNotification('error', 'Create failed', error?.message);
    },
  });

  const [updateQuotationAsync, { loading: updatingQuotation }] = useUpdateQuotationStageAndStatusMutation({
    onCompleted() {
      // handle create sucess
    },
    onError(error) {
      showNotification('error', 'Create failed', error?.message);
    },
  });

  const stageMappings: Record<number, string> = {
      0:'working_recap',
      1: 'initial_volumes',
      2: 'admin_check',
      3: 'pre_class',
      4: 'phasing',
      5: 'pack_copy',
      6: 'template',
    };

    function mapStageToName(stage: any): string {
      return stageMappings[stage] || 'unknown_stage';
    }

    function getRandomNumber() {
  return Math.random();
}
  const name = localStorage.getItem(STORAGE_KEYS.name);
  const handleCreateSheet = useCallback((key?) => {
    const stage = step.toString();
    console.log(" stage la :" + step);
    const handsontableData = excelToHandsontableRef.current?.getData();
    //console.log(handsontableData);

    if (handsontableData) {

        const { id:sheetId, data } = handsontableData;

        console.log(JSON.stringify(step));

        
        
        //console.log(JSON.stringify(data));
        const input = {
        id:sheetId,
        name: "Sheet",
        stage: stage,
        quoteId: quoteId,
        updateBy: name,
        dynamicFields: data,
      };

      if(sheetId)
      {
        updateSheetAsync({
          variables: {
            updateSheetInput: input,
          },
        });
      }
      else
      {
        createSheetAsync({
          variables: {
            createSheetInput: input,
          },
        });
      }

      // update quote
      let nextUser = "";
      if(name == "customer")
      {
        nextUser = "lfmr";
      }
      else if(name == "vendor")
      {
        nextUser = "lfmr";
      }
      else
      {
          nextUser = key;// getRandomNumber() < 0.5 ? "customer" : "vendor";
      }
        
      updateQuotationAsync({
          variables: {
            quotationId: quoteId ? quoteId : '',
            stage: mapStageToName(step.toString()),
            status: nextUser,
          },
        });
      
      }

      message.open({
      type: "success",
      content: "Update Successfull!",
    });
    navigate(-1);
      
    
}, [createSheetAsync, step]);

  const loading = useMemo(() => creating , [creating]);

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

  useEffect(() => {
    console.log(step);
    excelToHandsontableRef.current?.resetData();
  }, [step]);

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

  const handleChangeStep = (current: any) => {
  // The state update is asynchronous
  setStep(current);

  // This log may not immediately reflect the updated state
  console.log('Updated Step:', current);
};

  const handleMenuClick = ({ key }) => {

    // Handle the menu item click
    console.log('Selected Value:', key);
    handleCreateSheet(key);
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="customer">Customer</Menu.Item>
      <Menu.Item key="vendor">Vendor</Menu.Item>
    </Menu>
  );

  return name === 'lfmr' ? (
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
              
              <Dropdown overlay={menu} trigger={['click']}>
                <Button type="primary" className="bg-greens-light text-greens-normal" >
                  <Space>
                    <AddUserIcon />
                    <span>Assign</span>
                    <ArrowBottom />
                  </Space>
                
                </Button>
              </Dropdown>
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
            current={step}
            labelPlacement="vertical"
            onChange={(current) => handleChangeStep(current)}
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
             {quoteId  ? (
                <ExcelToHandsontable openTimeline={openTimeline} quoteId={quoteId} stage={step} ref={excelToHandsontableRef}/>
              ) : (
                // You can render a fallback or loading message here
                <p>Loading...</p>
              )}
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
  ) : (
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
              
                <Button type="primary" className="bg-greens-light text-greens-normal" onClick={(e) => {
                    e.preventDefault();
                    handleCreateSheet();
                  }}>
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
            current={step}
            labelPlacement="vertical"
            onChange={(current) => handleChangeStep(current)}
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
        <Row gutter={24}>
          
          <Col span={openTimeline ? 21 : 24}>
            <div>
             <Button
                style={{
                    position: 'absolute', 
                    zIndex: 1000, 
                    right:20
                }}
                type="primary"
                className="bg-greens-light text-greens-normal"
                onClick={() => setOpenTimeLine(!openTimeline)}
                icon={!openTimeline ? <EyeOutlined /> : <EyeInvisibleOutlined />}
              />
            </div>
            <div style={{ width: '100%' }}>
             {quoteId  ? (
                <ExcelToHandsontable openTimeline={openTimeline} quoteId={quoteId} stage={step} ref={excelToHandsontableRef}/>
              ) : (
                // You can render a fallback or loading message here
                <p>Loading...</p>
              )}
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
          <Col span={openTimeline ? 3 : 0}>
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
  )

  });

export default QuotaionDetail;
