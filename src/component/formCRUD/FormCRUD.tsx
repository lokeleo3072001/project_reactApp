import {
  Button,
  Checkbox,
  Form,
  Input,
  Modal,
  Radio,
  Select,
  Switch,
} from "antd";
import { sendGet, sendPost } from "../../api";
import "./FormCRUD.css";
import { useState } from "react";

const FormCRUD = (props: any) => {
  const { isOpen, setOpen, dataSource, setDataSource } = props;
  const [statusSwitch, setStatusSwitch] = useState(false);
  const inputText = [
    {
      label: "Username",
      value: "username",
      type: "text",
      placeHoler: "Enter username",
      error: "You need enter username",
    },
    {
      label: "Password",
      value: "password",
      placeHoler: "Enter password",
      type: "password",
      note: "Your password is between 4 and 12 characters",
      error: "You need enter password",
    },
    {
      label: "Input Text Label",
      value: "anything",
      type: "text",
      placeHoler: "Typing here",
      error: "You need enter Text Label",
    },
  ];

  const radioInput = [
    { name: "Radio selection 1", value: "1" },
    { name: "Radio selection 2", value: "2" },
    { name: "Radio selection 3", value: "3" },
  ];

  const option = [
    "Dropdown option",
    "Dropdown option 1",
    "Dropdown option 2",
    "Dropdown option 3",
    "Dropdown option 4",
    "Dropdown option 5",
  ];

  const [form] = Form.useForm();

  const submitForm = async (value: any) => {
    const submitData = {
      userName: value.username,
      password: value.password,
      note: value.anything,
      rememberMe: value.checkbox,
      radio: value.radio,
      switchForm: statusSwitch ? 1 : 0,
      selectOption: value.selectBox,
    };
    const res = await sendPost(`saveProduct`, submitData);
    setDataSource((prevData: any) => [
      ...prevData,
      { id: res.id, ...submitData },
    ]);
    setOpen(false);
  };
  return (
    <Modal
      className="model-custom"
      title={null}
      open={isOpen}
      onOk={() => setOpen(false)}
      onCancel={() => setOpen(false)}
      footer={null}
    >
      <Form form={form} onFinish={submitForm} className="form container">
        {inputText.map((data) => {
          return (
            <div key={data.value}>
              <label className="title-input" htmlFor={data.label}>
                {data.label}
              </label>
              <div>
                <Form.Item
                  name={data.value}
                  validateTrigger="onBlur"
                  hasFeedback
                  rules={[
                    {
                      min: 4,
                      max: 12,
                      required: true,
                      message: `You need enter your ${data.label} between 4 and 12 characters`,
                    },
                  ]}
                >
                  <Input
                    type={data.type}
                    id={data.value}
                    name={data.value}
                    className="input-text"
                    placeholder={data.placeHoler}
                  ></Input>
                </Form.Item>
                <p className="error"></p>
                <img
                  className="img-error"
                  src="./warning.png"
                  alt="Img error"
                />
              </div>
            </div>
          );
        })}

        <Form.Item
          valuePropName="checked"
          className="input-container"
          name={"checkbox"}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        <div>
          <label>Radio buttons</label>

          <Form.Item name={"radio"} initialValue={"0"}>
            <Radio.Group>
              {radioInput.map((data, index) => {
                return (
                  <div className="radio-index" key={index}>
                    <Radio value={index.toString()}>{data.name}</Radio>
                  </div>
                );
              })}
            </Radio.Group>
          </Form.Item>
        </div>

        <div>
          <Form.Item name={"switch"}>
            <Switch onChange={() => setStatusSwitch(!statusSwitch)}></Switch>
            <span style={{ marginLeft: 8 }}>{statusSwitch ? "On" : "Off"}</span>
          </Form.Item>
        </div>
        <div>
          <label className="dropdown-title">Dropdown Title</label>
          <Form.Item name={"selectBox"} initialValue={option[0]}>
            <Select className="input-text">
              {option.map((data, index) => {
                return (
                  <Select.Option key={index.toString()} value={data}>
                    {data}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
        </div>
        <div>
          <Button className="btn-custom cancel">Cancel</Button>
          <Button className="btn-custom next" htmlType="submit">
            Next
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default FormCRUD;
