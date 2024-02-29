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
import "./style.css";
import { useEffect, useState } from "react";

interface User {
  id: number;
  userName: string;
  password: string;
  note: String;
  radio: number;
  rememberMe: boolean;
  switchForm: boolean;
  selectOption: boolean;
}
const FormCRUD = (props: any) => {
  const [dataUser, setDataUser] = useState<User | null>(null);
  const { id, setID, isOpen, setOpen, setDataSource } = props;
  const [statusSwitch, setStatusSwitch] = useState(false);
  const [isChangePassword, setIsChangePassword] = useState(false);
  const [form] = Form.useForm();

  const inputText = [
    {
      label: "Username",
      value: "userName",
      type: "text",
      placeHoler: "Enter username",
      error: "You need enter username",
      min: 1,
      max: 30,
    },
    {
      label: "Password",
      value: "password",
      placeHoler: "Enter password",
      type: "password",
      note: "Your password is between 4 and 12 characters",
      error: "You need enter password",
      setPassword: () => {
        if (!isChangePassword && id) {
          form.setFieldsValue({
            password: "",
          });
        }
      },
      onChangePassword: () => {
        setIsChangePassword(true);
      },
      blurPassword: () => {
        if (!isChangePassword) {
          form.setFieldsValue({
            password: dataUser?.password,
          });
        }
      },
      min: 4,
      max: 12,
    },
    {
      label: "Input Text Label",
      value: "note",
      type: "text",
      placeHoler: "Typing here",
      error: "You need enter Text Label",
      min: 1,
      max: 30,
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

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const res = await sendGet("getProduct", { id: id });
        setDataUser(res);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (dataUser) {
      form.setFieldsValue({
        userName: dataUser.userName,
        password: dataUser.password,
        note: dataUser.note,
        checkboxForm: dataUser.rememberMe || false,
        radio: dataUser.radio.toString(),
        selectBox: dataUser.selectOption,
        switchForm: dataUser.switchForm || false,
      });
      setStatusSwitch(dataUser.switchForm);
    }
  }, [dataUser]);

  const submitForm = async (value: any) => {
    let submitData = {
      userName: value.userName,
      password: value.password,
      note: value.note,
      rememberMe: value.checkboxForm,
      radio: value.radio,
      switchForm: statusSwitch,
      selectOption: value.selectBox,
    };

    if (id) {
      await sendPost(`updateProduct`, { id: id, ...submitData });
      setDataSource((prevData: any) => {
        const newDataSource = [...prevData].filter(
          (item: any) => item.id !== id
        );

        const newData = [...newDataSource, { id: id, ...submitData }];

        if (Array.isArray(prevData)) {
          newData.sort((a: any, b: any) => a.id - b.id);
        }
        return newData;
      });
    } else {
      const res = await sendPost(`saveProduct`, submitData);
      setDataSource((prevData: any) => [
        ...prevData,
        { id: res.id, ...submitData },
      ]);
    }
    setOpen(false);
  };

  const cancelRequest = () => {
    setID();
    setOpen(false);
  };

  return (
    <Modal
      className="model-custom"
      title={null}
      open={isOpen}
      onCancel={cancelRequest}
      footer={null}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={submitForm}
        className="form container"
      >
        {inputText.map((dataInput, index) => {
          return (
            <div key={index}>
              <Form.Item
                key={dataInput.value}
                name={dataInput.value}
                validateTrigger="onBlur"
                hasFeedback
                rules={[
                  {
                    min: dataInput.min,
                    max: dataInput.max,
                    required: true,
                    message: `You need enter your ${dataInput.label} between ${dataInput.min} and ${dataInput.max} characters`,
                  },
                ]}
                label={dataInput.label}
              >
                <Input
                  type={dataInput.type}
                  id={dataInput.value}
                  className="input-text"
                  placeholder={dataInput.placeHoler}
                  onClick={dataInput?.setPassword}
                  onBlur={dataInput?.blurPassword}
                  onChange={dataInput?.onChangePassword}
                  autoComplete={`new-${dataInput.value}`}
                ></Input>
              </Form.Item>
              <p className="error"></p>
              <img className="img-error" src="./warning.png" alt="Img error" />
            </div>
          );
        })}

        <Form.Item
          valuePropName="checked"
          className="input-container"
          name={"checkboxForm"}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        <Form.Item name={"radio"} initialValue={"0"} label={"Radio Buttons"}>
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

        <div>
          <Form.Item className="switch-form" name={"switchForm"}>
            <Switch onChange={() => setStatusSwitch(!statusSwitch)}></Switch>
          </Form.Item>
          <span className="status-switch">{statusSwitch ? "On" : "Off"}</span>
        </div>

        <Form.Item
          name={"selectBox"}
          initialValue={option[0]}
          label={"Dropdown Title"}
        >
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
        <div>
          <Button className="btn-custom cancel">Cancel</Button>
          <Button className="btn-custom next" htmlType="submit">
            {id ? "Accept" : "Next"}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default FormCRUD;
