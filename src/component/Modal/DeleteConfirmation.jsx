import React from "react";
import { Modal, Button, Spinner } from "react-bootstrap";

const DeleteConfirmation = ({
  showModal,
  hideModal,
  confirmModal,
  id,
  deleteLoader,
}) => {
  return (
    <Modal show={showModal} onHide={hideModal}>
      <Modal.Header closeButton>
        <div className="">
          <Modal.Title>Are You Want To Delete</Modal.Title>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="pointer text-center">
          <img className=" w-50 " src="./image/download.png" alt="#" />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="default" onClick={hideModal}>
          Cancel
        </Button>

        <Button
          variant="danger"
          onClick={() => confirmModal(id)}
          className={deleteLoader && "submit-btn"}
        >
          {deleteLoader ? (
            <Spinner animation="border" role="status" size="sm" />
          ) : (
            "Delete"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteConfirmation;
