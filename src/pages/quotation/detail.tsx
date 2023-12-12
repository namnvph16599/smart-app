import { memo, useEffect, useState } from "react";
import { AppLocation } from "../../components";
import AppRoutes from "../../routers/app-router";
import { Button, Col, Row, Space, Steps } from "antd";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { HotTable } from "@handsontable/react";
import { registerAllModules } from "handsontable/registry";
import "handsontable/dist/handsontable.full.css";
import Handsontable from "handsontable";

//
import AddUserIcon from "../../assets/icons/add-user.svg?react";
import ArrowBottom from "../../assets/icons/arrow-bottom.svg?react";
import { TimelineQuote } from "./components";
import ExcelToHandsontable from "../sheet/HandsontableComponent";

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
  const [openTimeline, setOpenTimeLine] = useState(false);

  const [data, setData] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    // Fetch data from the API
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((apiData) => {
        setData(apiData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    // Fetch user data from the API to populate the dropdown list
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((apiUsers) => {
        setUsers(apiUsers);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  // Register a custom cell type for the select dropdown
  Handsontable.cellTypes.registerCellType("customDropdown", {
    editor: Handsontable.editors.AutocompleteEditor, // Use AutocompleteEditor for select dropdown behavior
    renderer: Handsontable.renderers.TextRenderer, // Use TextRenderer to display selected value
  });

  const userNames = users.map((user) => user.name);

  const columns: Handsontable.ColumnSettings[] = [
    {
      data: "title",
      title: "Title",
    },
    {
      data: "userId",
      title: "User",
      type: "customDropdown", // Use the registered custom cell type
      source: userNames, // Populate the dropdown source with user names
    },
    {
      data: "body",
      title: "Body",
    },
  ];

  return (
    <div className="bg-white px-[32px] custom-table">
      <AppLocation
        routes={[
          {
            label: "Home",
            to: AppRoutes.home,
          },
          {
            label: "Quote",
          },
        ]}
        title="Something name"
        rightContent={
          <Space>
            <Button
              type="primary"
              className="bg-greens-light text-greens-normal"
            >
              <Space>
                <AddUserIcon />
                <span>Assign</span>
                <ArrowBottom />
              </Space>
            </Button>
            <Button>Cancel</Button>
            <Button type="primary" className="bg-greens-normal">
              Save
            </Button>
          </Space>
        }
      />
      <div className="py-32px">
        <Steps
          current={2}
          labelPlacement="vertical"
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
          <div style={{ width: "100%" }}>
            <ExcelToHandsontable openTimeline={openTimeline} />
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
                actionLog: "steven",
              },
              {
                approvedDate: new Date(),
                actionLog: "steven",
              },
              {
                approvedDate: new Date(),
                actionLog: "steven",
              },
              {
                approvedDate: new Date(),
                actionLog: "steven",
              },
            ]}
          />
        </Col>
      </Row>
    </div>
  );
});

export default QuotaionDetail;
