import { memo } from "react";
import { AppLocation } from "../../components";
import AppRoutes from "../../routers/app-router";
import { Button, Col, Row, Space, Steps } from "antd";
import AddUserIcon from "../../assets/icons/add-user.svg?react";
import ArrowBottom from "../../assets/icons/arrow-bottom.svg?react";
import { TimelineQuote } from "./components";
import ImageDemo from "../../assets/images/demo-excel.png";

const StepLabel = ({ name }: { name: string }) => {
  return (
    <div className="block text-[16px] bg-greens-normal text-white font-medium leading-[14px] py-[8px] px-[8px] rounded-[6px]">
      {name}
    </div>
  );
};

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
          <img src={ImageDemo} alt="" className="w-full" />
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
            ]}
          />
        </Col>
      </Row>
    </div>
  );
});

export default QuotaionDetail;
