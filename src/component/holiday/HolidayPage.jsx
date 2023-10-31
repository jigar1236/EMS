/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import BootstrapTable from "react-bootstrap-table-next";
import { Button } from "react-bootstrap";
import ActionFormatter from "./ActionFormatter";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import axios from "axios";
import HolidayImageFormatter from "./HolidayImageFormatter";
import { useNavigate } from "react-router-dom";
import DeleteConfirmation from "../Modal/DeleteConfirmation";
import { toast } from "react-toastify";
import HolidayDateFormatter from "./HolidayDateFormatter";
import HolidayDayFormatter from "./HolidayDayFormatter";
import AddHoliday from "./AddHoliday";
import HolidayImageshow from "./HolidayImageshow";

const HolidayPage = () => {
  const [showAddHolidayModal, setAddHolidayModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const [holidayList, setHolidayList] = useState([]);
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [imageModelShow, setImageModelShow] = useState(false);
  const [imageurl, setimageurl] = useState("");
  // const [addholidayLoader, setAddHolidayLoader] = useState(false);

  const [holidayDeleteId, setHolidayDeleteId] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { token } = JSON.parse(localStorage.getItem("userData"));
  const headers = {
    authorization: token,
  };

  useEffect(() => {
    getAllHoliday();
  }, []);
  
  const handleImageShow = (url) => {
    console.log("🚀 ~ file: HolidayPage.jsx:42 ~ handleImageShow ~ url:", url)
    setImageModelShow(true);
    setimageurl(url);
  };
  const handledelete = ({ holiday_id }) => {
    setHolidayDeleteId(holiday_id);
    setShowDeleteModal(true);
  };
  // const handleView = ({ _id }) => {
  //   navigate(`/holiday${_id}`);
  // };

  const handleEdit = ({ holiday_id }) => {
    navigate(`/holiday/${holiday_id}`);
  };

  const getAllHoliday = async () => {
    setLoader(true);

    const response = await axios.get("http://localhost:3100/api/holiday", {
      headers,
    });
    setLoader(false);

    const { data } = response || {};
    const { data: lastHolidaydata, success } = data || {};
    if (success) {
      setHolidayList(lastHolidaydata.list);
    }
  };

  const confirmDelete = async (id) => {
    setDeleteLoader(true);
    try {
      const response = await axios.delete(
        `http://localhost:3100/api/holiday/${id}`,
        { headers }
      );
      const { data } = response || {};
      const { success, message } = data || {};
      if (success) {
        setDeleteLoader(false);
        setShowDeleteModal(false);
        setHolidayDeleteId("");
        toast.success(message);
        getAllHoliday();
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
      dataField: "holiday_img.url",
      text: "Image",
      headerAlign: "center",
      align: "center",
      headerStyle: {
        width: "80px",
      },
      formatter: (cell, row) => {
        return (
          <HolidayImageFormatter
            cell={cell}
            row={row}
            handleImageShow={handleImageShow}
          />
        );
      },
    },
    {
      dataField: "holiday_date",
      text: "Date",
      headerAlign: "center",
      align: "center",
      headerStyle: {
        width: "25%",
      },
      formatter: (cell, row) => {
        return <HolidayDateFormatter cell={cell} row={row} />;
      },
    },
    {
      dataField: "day",
      text: "Day",
      headerAlign: "center",
      align: "center",
      headerStyle: {
        width: "150px",
      },
      formatter: (cell, row) => {
        return <HolidayDayFormatter cell={cell} row={row} />;
      },
    },
    {
      dataField: "holiday_title",
      text: "Holiday",
      headerAlign: "center",
      align: "center",
      headerStyle: {
        width: "150px",
      },
    },
    {
      dataField: "action",
      text: "Action",
      headerAlign: "center",
      headerStyle: {
        width: "20%",
      },
      formatter: (cell, row) => {
        return (
          <ActionFormatter
            row={row}
            // handleView={handleView}
            handleEdit={handleEdit}
            handledelete={handledelete}
          />
        );
      },
    },
  ];

  return (
    <div className=" bg-transparent main-box">
      <div className="main-content">
        <div className="slidebar_box ">
          <Sidebar />
        </div>
        <div className="content-main p-4">
          <div className="d-flex justify-content-between align-items-center pb-3">
            <div className="text-center">
              <h3> Holiday</h3>
            </div>
            <div className="holiday-btn">
              <Button
                variant="success"
                onClick={() => {
                  setAddHolidayModal(true);
                }}
                className="text-primary text-white"
              >
                Add Holiday
              </Button>
            </div>
          </div>

          {loader ? (
            <div className="loader-overlay">
              <div className="loader"></div>
            </div>
          ) : (
            <BootstrapTable
              remote
              boostrap4={true}
              keyField="id"
              data={holidayList}
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
              id={holidayDeleteId}
              deleteLoader={deleteLoader}
            />
          )}
        </div>
        <AddHoliday
          getAllHoliday={getAllHoliday}
          showModal={showAddHolidayModal}
          hideModal={() => setAddHolidayModal(false)}
          setLoader={setLoader}
        />
      </div>
      {imageModelShow && (
        <HolidayImageshow
          show={imageModelShow}
          onHide={() => setImageModelShow(false)}
          imageurl={imageurl}
         
        />
      )}
    </div>
  );
};

export default HolidayPage;
