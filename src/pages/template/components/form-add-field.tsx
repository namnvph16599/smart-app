import { Form, Input, Modal, Select, Space } from 'antd';
import { FormLabel } from '../../../components';
import { TypeOptions } from '../form';

export type TFormAddField = {
  name: string;
  type: string;
};

type Props = {
  onFinish: (values: TFormAddField) => void;
  open: boolean;
  setOpen: (v: boolean) => void;
};

type FieldType = {
  name?: string;
  type?: string;
};

export const FormAddField = ({ open, setOpen, onFinish }: Props) => {
  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      title={
        <Space>
          <h2 className="text-[22px] leading-[26px]">New field</h2>
        </Space>
      }
      okButtonProps={{
        className: 'bg-greens-normal',
        form: 'form-add-field',
        htmlType: 'submit',
      }}
      okText="Save">
      <Form
        name="form-add-field"
        layout="vertical"
        id="form-add-field"
        labelAlign="left"
        onFinish={onFinish}
        requiredMark={false}>
        <Form.Item<FieldType>
          label={<FormLabel title="Filed name" required />}
          name="name"
          rules={[{ required: true, message: 'Please input your Filed name!' }]}>
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label={<FormLabel title="Field type" required />}
          name="type"
          rules={[{ required: true, message: 'Please input your Field type!' }]}>
          <Select
            options={TypeOptions}
            optionLabelProp="label"
            optionRender={(option) => (
              <Space>
                <option.data.icon />
                {option.data.label}
              </Space>
            )}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
