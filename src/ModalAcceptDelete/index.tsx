import { Button, Modal } from "antd";
import { sendDelete, sendPost } from "../api";

const ModalAcceptDelete = (props: any) => {
  const {
    idDelete,
    isOpenModalDelete,
    setIsOpenModalDelete,
    dataSource,
    setDataSource,
    setIDDelete,
  } = props;

  const deleteUser = () => {
    sendDelete("deleteProduct", { id: idDelete });
    const newDataSource = dataSource.filter(
      (item: any) => item["id"] !== idDelete
    );
    setDataSource(newDataSource);
    setIsOpenModalDelete(false);
    setIDDelete();
  };

  const cancelDelete = () => {
    setIsOpenModalDelete(false);
    setIDDelete();
  };
  return (
    <Modal
      className="model-custom"
      title={null}
      open={isOpenModalDelete}
      onOk={deleteUser}
      onCancel={cancelDelete}
    >
      <h1>Xác nhận xoá user</h1>
    </Modal>
  );
};

export default ModalAcceptDelete;
