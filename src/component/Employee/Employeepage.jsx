/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ActionFormatter from "./ActionFormatter";
import DeleteConfirmation from "../Modal/DeleteConfirmation";
import Sidebar from "../sidebar/Sidebar";

const Employeepage = ({ loggedInUser }) => {
  const [loader, setLoader] = useState(false);
  const [deleteLoader, setDeleteLoader] = useState(false);
  const { token } = JSON.parse(localStorage.getItem("userData"));
  const headers = {
    authorization: token,
  };
  const [employeeToDeleteId, setEmployeeToDeleteId] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [employeeData, setEmployeeData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllUser();
  }, []);

  const getAllUser = async () => {
    setLoader(true);
    const response = await axios.get("http://localhost:3100/api/user", {
      headers,
    });
    setLoader(false);
    const { data } = response || {};
    const { data: lastdata, success } = data || {};
    if (success) {
      setEmployeeData(lastdata.list);
    }
  };

  const handleView = ({ _id }) => {
    navigate(`/view-employee/${_id}`);
  };

  const handleEdit = ({ _id }) => {
    navigate(`/edit-employee/${_id}`); 
  };

  const handledelete = ({ _id }) => {
    setEmployeeToDeleteId(_id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async (id) => {
    setDeleteLoader(true);
    try {
      const response = await axios.delete(
        `http://localhost:3100/api/user/${id}`,
        { headers }
      );
      const { data } = response || {};
      const { success, message } = data || {};
      if (success) {
        setDeleteLoader(false);
        setShowDeleteModal(false);
        setEmployeeToDeleteId("");     
        toast.success(message);
        getAllUser();
      } else {
        toast.error(message);
      }
    } catch (err) {
      setDeleteLoader(false);
      console.log(" err:", err);
    }
  };
  const columns = [
    {
      dataField: "firstname",
      text: "First Name",
      headerAlign: "center",
      align: "center",
      style: {
        fontSize: "14px",
      },
      formatter: (cell, row) => {
        return row.firstname + " " + row.lastname;
      },
    },
    {
      dataField: "email",
      headerAlign: "center",
      align: "center",
      text: "Email",
      headerStyle: {
       width: "25%"
      },
      style: {
        fontSize: "14px",
       
      },
    },
    {
      dataField: "gender",
      headerAlign: "center",
      align: "center",
      text: "Gender",
      headerStyle: {
        width: "100px"
      },
      style: {
        fontSize: "14px",
      },
    },
    {
      dataField: "department",
      text: "Department",
      headerAlign: "center",
      align: "center",
      style: {
        fontSize: "14px",
      },
    },
    {
      dataField: "actions",
      headerAlign: "center",
      text: "Action",
      align: "center",
      style: {
        fontSize: "18px",
      },

      formatter: (cell, row) => {
        return (
          <ActionFormatter
            row={row}
            handleView={handleView}
            handleEdit={handleEdit}
            handledelete={handledelete}
          />
        );
      },
    },
  ];
  const onsubmit = () => {
    navigate("/add-employee");
  };

  return (
    <div className=" bg-transparent main-box">
      {/* <div className="text-end mx-3 my-2">
        <Navbar />
      </div> */}
      <div className="main-content">
        <div className="slidebar_box">
          <Sidebar />
        </div>
        <div className="content-main">
          <div className="text-end mx-3 my-2 text-primary">
            <Button variant="success" onClick={onsubmit}>+ Add Employee</Button>
          </div>
          <h1 className="headingemployee text-center"> Employee List </h1>

          {loader ? (
            <div className="loader-overlay">
              <div className="loader"></div>
            </div>
          ) : (
            <BootstrapTable
              keyField="employyeId"
              data={employeeData}
              columns={columns}
              hover
              className="bootstrap_table"
              pagination={paginationFactory()}
            />
          )}

          {showDeleteModal && (
            <DeleteConfirmation
              showModal={showDeleteModal}
              hideModal={() => setShowDeleteModal(false)}
              confirmModal={confirmDelete}
              id={employeeToDeleteId}
              deleteLoader={deleteLoader}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Employeepage;
