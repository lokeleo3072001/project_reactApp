import { useEffect, useState } from "react";
import { sendDelete, sendGet } from "../../api";
import { Button, Table } from "antd";
import "./AllUser.css";
import FormCRUD from "../formCRUD/FormCRUD";

function AllUser() {
  const [dataSource, setDataSource] = useState([]);
  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await sendGet(`getAllProduct`);
      setDataSource(res);
    };
    fetchData();
  }, []);

  const radioInput = [
    { name: "Radio selection 1", value: "1" },
    { name: "Radio selection 2", value: "2" },
    { name: "Radio selection 3", value: "3" },
  ];

  const deleteUser = (value: any) => {
    sendDelete("deleteProduct", { id: value });
    const newDataSource = dataSource.filter((item) => item["id"] !== value);
    setDataSource(newDataSource);
  };

  const columns = [
    {
      title: "UserName",
      dataIndex: "userName",
      key: "userName",
      width: "15%",
      render: (record: any) => {
        return (
          <>
            <span className="text-name">{record}</span>
          </>
        );
      },
    },
    {
      title: "Password",
      dataIndex: "password",
      key: "password",
      width: "15%",
      render: (record: any) => {
        return (
          <>
            <span className="text-name">{record}</span>
          </>
        );
      },
    },
    {
      title: "Note",
      dataIndex: "note",
      key: "note",
      width: "15%",
      render: (record: any) => {
        return (
          <>
            <span className="text-name">{record}</span>
          </>
        );
      },
    },
    {
      title: "Radio",
      dataIndex: "radio",
      key: "radio",
      width: "10%",
      render: (record: any) => {
        return (
          <>
            <span className="text-name">
              {radioInput[parseInt(record, 10)].name}
            </span>
          </>
        );
      },
    },
    {
      title: "Switch",
      dataIndex: "switchForm",
      key: "switch",
      width: "5%",
      render: (record: any) => {
        return (
          <>
            <span className="text-name">{record ? "On" : "Off"}</span>
          </>
        );
      },
    },
    {
      title: "Remember Me",
      dataIndex: "rememberMe",
      key: "rememberMe",
      width: "5%",
      render: (record: any) => {
        return (
          <>
            <span className="text-name">{record ? "True" : "False"}</span>
          </>
        );
      },
    },
    {
      title: "Select Option",
      dataIndex: "selectOption",
      key: "selectOption",
      width: "20%",
      render: (record: any) => {
        return (
          <>
            <span className="text-name">{record}</span>
          </>
        );
      },
    },
    {
      title: "Delete",
      dataIndex: "id",
      key: "id",
      width: "10%",
      render: (record: any) => {
        return <Button onClick={() => deleteUser(record)}>Xoá</Button>;
      },
    },
  ];

  return (
    <div>
      <Table dataSource={dataSource} columns={columns} className="table" />
      <Button className="btn-add" onClick={() => setOpenForm(!openForm)}>
        Add
      </Button>
      {openForm && (
        <FormCRUD
          isOpen={openForm}
          setOpen={setOpenForm}
          dataSource={dataSource}
          setDataSource={setDataSource}
        ></FormCRUD>
      )}
    </div>
  );
}

export default AllUser;
