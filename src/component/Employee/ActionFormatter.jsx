import React from "react";
import { TbEdit } from "react-icons/tb";
import { FaRegEye } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";

const ActionFormatter = ({ row, handleView, handleEdit, handledelete }) => {
  return (
    <>
      <div className=" d-flex justify-content-around pointer">
        <TbEdit onClick={() => handleEdit(row)} />

        <FaRegEye onClick={() => handleView(row)} />

        <FaTrashCan onClick={() => handledelete(row)} />
      </div>
    </>
  );
};

export default ActionFormatter;
