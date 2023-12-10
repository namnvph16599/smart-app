import { memo } from "react";
import { AppLocation } from "../../components";
import AppRoutes from "../../routers/app-router";
import { Button, Col, Row, Space, Steps } from "antd";
import { HotTable } from "@handsontable/react";
import { registerAllModules } from "handsontable/registry";
//
import AddUserIcon from "../../assets/icons/add-user.svg?react";
import ArrowBottom from "../../assets/icons/arrow-bottom.svg?react";
import { TimelineQuote } from "./components";

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
        <Col span={18}>
          <div>
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
            />
          </div>
        </Col>
        <Col span={6}>
          <TimelineQuote
            approveds={[
              {
                approvedDate: new Date(),
                actionLog: "Ngo van nam",
              },
              {
                approvedDate: new Date(),
                actionLog: "Ngo van nam",
              },
              {
                approvedDate: new Date(),
                actionLog: "Ngo van nam",
              },
              {
                approvedDate: new Date(),
                actionLog: "Ngo van nam",
              },
              {
                approvedDate: new Date(),
                actionLog: "Ngo van nam",
              },
              {
                approvedDate: new Date(),
                actionLog: "Ngo van nam",
              },
              {
                approvedDate: new Date(),
                actionLog: "Ngo van nam",
              },
              {
                approvedDate: new Date(),
                actionLog: "Ngo van nam",
              },
              {
                approvedDate: new Date(),
                actionLog: "Ngo van nam",
              },
              {
                approvedDate: new Date(),
                actionLog: "Ngo van nam",
              },
            ]}
          />
        </Col>
      </Row>
    </div>
  );
});

export default QuotaionDetail;
