import dayjs from "dayjs";
import { Space, Timeline } from "antd";
import { memo } from "react";
import DotTimelineIcon from "../../../assets/icons/dot.svg?react";
import CircleError from "../../../assets/icons/circle-error.svg?react";
import CircleSuccess from "../../../assets/icons/cicle-success.svg?react";

enum ApproveType {
  rejected = "rejected",
  accepted = "accepted",
}

type Props = {
  approveds?: { actionLog: string; approvedDate: Date; type?: ApproveType }[];
};

export const TimelineQuote = memo(({ approveds }: Props) => {
  const renderTagByActionLog = (type?: ApproveType) => {
    if (type === ApproveType.accepted) {
      return (
        <div className="rounded-[6px] bg-greens-light inline-block py-[2px] px-[6px] my-[8px]">
          <Space>
            <CircleSuccess />
            <span className="text-greens-normal text-[10px]">Accepted</span>
          </Space>
        </div>
      );
    }
    return (
      <div className="rounded-[6px] bg-status-supplier-bg inline-block py-[2px] px-[6px] my-[8px]">
        <Space>
          <CircleError />
          <span className="text-error text-[10px]">Rejected</span>
        </Space>
      </div>
    );
  };

  return (
    <div className="">
      <div className="flex justify-between items-center">
        <span className="text-[16px] font-medium leading-[20px] mb-[24px]">
          Timeline
        </span>
      </div>
      <Timeline
        items={(approveds ?? []).map((item, idx) => ({
          dot: <DotTimelineIcon />,
          children: (
            <div key={idx} className="hover:cursor-pointer">
              <p className="text-[14px] font-normal leading-16px">
                {item?.approvedDate &&
                  dayjs(item?.approvedDate).format("HH:mm DD/MM/YYYY")}
              </p>
              {renderTagByActionLog(item?.type)}
              <p className="text-[10px] text-grey-600">by {item?.actionLog}</p>
            </div>
          ),
        }))}
      />
    </div>
  );
});
