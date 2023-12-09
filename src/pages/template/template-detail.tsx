import { memo, useEffect, useState } from "react";
import { AppLocation } from "../../components";
import AppRoutes from "../../routers/app-router";
import { Button, Col, Form, Input, Row, Select, Space } from "antd";
import {
  UpOutlined,
  PlusOutlined,
  FieldNumberOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { FormAddField, TFormAddField } from "./components";
import TextIcon from "../../assets/icons/pen.svg?react";
import DropdownIcon from "../../assets/icons/dropdown.svg?react";
import DateIcon from "../../assets/icons/date.svg?react";
import DurationIcon from "../../assets/icons/clock.svg?react";
import ContactIcon from "../../assets/icons/user.svg?react";
import CheckedIcon from "../../assets/icons/checked.svg?react";
import SymbolIcon from "../../assets/icons/symbol.svg?react";
import AutoNumberIcon from "../../assets/icons/auto-number.svg?react";
import RemoveIcon from "../../assets/icons/remove.svg?react";

export const TypeOptions = [
  {
    label: "Text",
    value: "string",
    icon: TextIcon,
  },
  {
    label: "Number",
    value: "number",
    icon: FieldNumberOutlined,
  },
  {
    label: "Drop down list",
    value: "array",
    icon: DropdownIcon,
  },
  {
    label: "Date",
    value: "date",
    icon: DateIcon,
  },
  {
    label: "Duration",
    value: "duration",
    icon: DurationIcon,
  },
  {
    label: "Contact list",
    value: "contact",
    icon: ContactIcon,
  },
  {
    label: "Check box",
    value: "checkbox",
    icon: CheckedIcon,
  },
  {
    label: "Symbols",
    value: "boolean",
    icon: SymbolIcon,
  },
  {
    label: "Auto number",
    value: "auto_number",
    icon: AutoNumberIcon,
  },
];

const TemplateDetail = memo(() => {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);

  const oldAttribute = form.getFieldValue("attributes");

  const handleAddField = (values: TFormAddField) => {
    form.setFieldsValue({
      attributes: [...(oldAttribute ?? []), values],
    });

    setOpen(false);
  };

  useEffect(() => {
    form.setFieldsValue({
      // attributes: [...(oldAttribute ?? []), values],
      attributes: [
        ...(oldAttribute ?? []),
        {
          name: "3",
          type: "text",
        },
        {
          name: "1",
          type: "text",
        },
        {
          name: "2",
          type: "text",
        },
      ],
    });
  }, []);

  return (
    <div className="bg-white px-[32px] custom-table">
      <AppLocation
        routes={[
          {
            label: "Home",
            to: AppRoutes.home,
          },
          {
            label: AppRoutes.template.label,
          },
        ]}
        title="Create new template"
        rightContent={
          <Space>
            <Button>Cancel</Button>
            <Button
              type="primary"
              className="bg-greens-normal hover:bg-greens-hover"
            >
              Save
            </Button>
          </Space>
        }
      />
      <div className="pt-32px flex justify-center">
        <Form
          name="form-create-template"
          id="form-create-template"
          className="w-[600px]"
          form={form}
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Please enter name" }]}
            className="!mb-[8px]"
          >
            <Input placeholder="New template" size="large" />
          </Form.Item>

          <Form.Item name="description">
            <Input placeholder="Add description" bordered={false} />
          </Form.Item>
          <Form.List name="attributes">
            {(fields, { remove, move }) => (
              <>
                {fields.map(({ key, name, ...restField }, idx) => (
                  <Row key={key} gutter={8}>
                    <Col span={10}>
                      <Form.Item
                        {...restField}
                        name={[name, "name"]}
                        rules={[
                          { required: true, message: "Missing first name" },
                        ]}
                      >
                        <Input
                          placeholder="First Name"
                          className="basis-6/12 w-full"
                        />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        {...restField}
                        name={[name, "type"]}
                        className="flex-1/2"
                        rules={[
                          { required: true, message: "Missing last name" },
                        ]}
                      >
                        <Select
                          options={TypeOptions}
                          className="basis-5/12 min-w-[200px]"
                          optionRender={(option) => (
                            <Space>
                              <option.data.icon />
                              {option.data.label}
                            </Space>
                          )}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={4}>
                      <div className="flex justify-center">
                        <UpOutlined
                          className="flex justify-center items-center mx-auto rounded-[4px] w-[40px] h-[40px] hover:bg-greens-light"
                          onClick={() => {
                            if (!idx) return;
                            move(idx, idx - 1);
                          }}
                        />
                        <DownOutlined
                          className="flex justify-center items-center mx-auto rounded-[4px] w-[40px] h-[40px] hover:bg-greens-light"
                          onClick={() => {
                            move(idx, idx + 1);
                          }}
                        />
                      </div>
                    </Col>
                    <Col span={2}>
                      <div
                        className="pt-[8px] hover:cursor-pointer"
                        onClick={() => remove(name)}
                      >
                        <RemoveIcon />
                      </div>
                    </Col>
                  </Row>
                ))}
                <Form.Item>
                  <Button
                    type="primary"
                    className="bg-greens-normal"
                    onClick={() => {
                      setOpen(true);
                    }}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add field
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form>
      </div>
      {open && (
        <FormAddField open={open} setOpen={setOpen} onFinish={handleAddField} />
      )}
    </div>
  );
});

export default TemplateDetail;
