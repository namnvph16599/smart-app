import React from "react";

type Props = {
  title: string;
  required?: boolean;
};

export const FormLabel = ({ title, required }: Props) => {
  return (
    <span className="font-semibold text-[14px] leading-[16px] text-grey-900">
      {title}
      {required && <span className="text-status-error">*</span>}
    </span>
  );
};
