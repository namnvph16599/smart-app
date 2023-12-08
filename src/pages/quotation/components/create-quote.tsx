import { Form, Input, Modal, Space } from "antd";
import React, { memo } from "react";
import CircleDangerIcon from "../../../assets/icons/circle-danger.svg?react";
import { FormLabel } from "../../../components";

type Props = {
  open: boolean;
  setOpen: (v: boolean) => void;
};

type FieldType = {
  poNo?: string;
  itemNo?: string;
};

export const CreateQuote = memo(({ open, setOpen }: Props) => {
  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      title={
        <Space>
          <h2 className="text-[22px] leading-[26px]">Create quote item</h2>
          <CircleDangerIcon />
        </Space>
      }
      okButtonProps={{
        className: "bg-greens-normal",
        form: "form-create-quote",
        htmlType: "submit",
      }}
      okText="Save"
    >
      <Form
        name="form-create-quote"
        layout="vertical"
        id="form-create-quote"
        labelAlign="left"
        requiredMark={false}
      >
        <Form.Item<FieldType>
          label={<FormLabel title="PO No." required />}
          name="poNo"
          rules={[{ required: true, message: "Please input your poNo!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label={<FormLabel title="Item No." required />}
          name="itemNo"
          rules={[{ required: true, message: "Please input your itemNo!" }]}
        >
          <Input />
        </Form.Item>

        <FormLabel title="Template" required />

        <div className="p-[16px] bg-grey-100 rounded-[12px]">
          <Form.Item<FieldType>
            label={<FormLabel title="Working recap" />}
            name="itemNo"
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label={<FormLabel title="Initial volumnes" />}
            name="itemNo"
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label={<FormLabel title="Phasing" />}
            name="itemNo"
          >
            <Input />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
});
