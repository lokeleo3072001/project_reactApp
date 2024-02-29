import { useEffect, useState } from "react";
import { sendGet } from "../../api";
import { Button, Table } from "antd";
import "./style.css";
import FormCRUD from "../FormCRUD";
import ModalAcceptDelete from "../../ModalAcceptDelete/ModalAcceptDelete";

function AllUser() {
  const [dataSource, setDataSource] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [id, setID] = useState();
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await sendGet(`getAllProduct`);
      setDataSource(res);
    };
    fetchData();
  }, []);

  const radioInput = [
    "Radio selection 1",
    "Radio selection 2",
    "Radio selection 3",
  ];

  const deleteUser = (value: any) => {
    setIsOpenModalDelete(true);
    setID(value);
  };

  const changeUser = (value: any) => {
    setID(value);
    setOpenForm(true);
  };

  const columns = [
    {
      title: "UserName",
      dataIndex: "userName",
      key: "userName",
      width: "10%",
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
      width: "10%",
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
      width: "10%",
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
              {radioInput[parseInt(record, 10)]}
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
      width: "10%",
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
      title: "Delete",
      dataIndex: "id",
      key: "id",
      width: "10%",
      render: (record: any) => {
        return (
          <>
            <Button
              className="btn btn-delete"
              onClick={() => deleteUser(record)}
            >
              Xoá
            </Button>
            <Button
              className="btn btn-change"
              onClick={() => changeUser(record)}
            >
              Sửa
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <div>
      <Button className="btn-add" onClick={() => setOpenForm(!openForm)}>
        Add
      </Button>
      <Table
        dataSource={dataSource}
        columns={columns}
        className="table"
        rowKey="id"
        // pagination={false}
        pagination={{ pageSize: 5 }}
      />

      {isOpenModalDelete && (
        <ModalAcceptDelete
          idDelete={id}
          setIDDelete={setID}
          isOpenModalDelete={isOpenModalDelete}
          setIsOpenModalDelete={setIsOpenModalDelete}
          dataSource={dataSource}
          setDataSource={setDataSource}
        ></ModalAcceptDelete>
      )}
      {openForm && (
        <FormCRUD
          id={id}
          setID={setID}
          isOpen={openForm}
          setOpen={setOpenForm}
          setDataSource={setDataSource}
        ></FormCRUD>
      )}
    </div>
  );
}

export default AllUser;
