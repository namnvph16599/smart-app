import { Form, InputNumber, Modal, Space } from "antd";

type Props = {
  onFinish: (value: { index: number }) => void;
  open: boolean;
  setOpen: (v: boolean) => void;
};

export const ModalMoveFieldIndex = ({ open, setOpen, onFinish }: Props) => {
  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      title={
        <Space>
          <h2 className="text-[22px] leading-[26px]">Move index field</h2>
        </Space>
      }
      okButtonProps={{
        className: "bg-greens-normal",
        form: "form-add-field",
        htmlType: "submit",
      }}
      okText="Save"
    >
      <Form
        name="form-add-field"
        layout="vertical"
        id="form-add-field"
        labelAlign="left"
        onFinish={onFinish}
        requiredMark={false}
      >
        <Form.Item
          name="index"
          rules={[{ required: true, message: "Please input your index!" }]}
        >
          <InputNumber className="w-full" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
