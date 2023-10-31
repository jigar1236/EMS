import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, Spinner } from "react-bootstrap";
import UpadatePhoto from "./UpadatePhoto";
import DatePicker from "react-datepicker";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddHoliday = ({ showModal, hideModal,  getAllHoliday }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imageLoader, setImageLoader] = useState(false);
  const validationSchema = Yup.object().shape({
    holiday_title: Yup.string().required("Please Enter Holiday Name"),
    holiday_date: Yup.string().required("Please Enter Holiday Date"),
    holiday_img: Yup.string().required("Please Enter Image"),
  });
  const formik = useFormik({
    initialValues: {
      holiday_title: "",
      holiday_date: "",
      holiday_img: "",
    },
    validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });
  const { token } = JSON.parse(localStorage.getItem("userData"));
  const headers = {
    authorization: token,
  };

  const renderDateOfholidaydate = () => {
    const { holiday_date } = formik.values || {};
    if (holiday_date) {
      return new Date(holiday_date);
    } else {
      return new Date();
    }
  };
  const handleSubmit = async (body) => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3100/api/holiday",
        body,
        { headers }
      );
      const { data } = response || {};
      const { success, message } = data || {};
      if (response) {
        setLoading(false);

        if (success) {
          hideModal();
          getAllHoliday();
          toast.success(message);
          setTimeout(() => {
            navigate("/holiday");
          });
        } else {
          toast.error(message);
        }
      }
    } catch (err) {
      setLoading(false);

      console.log(" err:", err);
    }
  };
  const handleImageAddApiCall = async (ImageData) => {
    try {
      const formData = new FormData();
      formData.append("holidayImg", ImageData);
      setImageLoader(true);
      const response = await axios.post(
        "http://localhost:3100/api/image/holiday-img",
        formData,
        { headers }
      );
      const { data } = response || {};
      

      const { success, message, data: holidayImageData } = data || {};
      const { _id } = holidayImageData || {};

      if (response) {
        

        if (success) {
          formik.setFieldValue("holiday_img", _id);
          setImageLoader(false);
          // toast.success(message);
        } else {
          // toast.error(message);
        }
      }
    } catch (err) {}
  };
  console.log(formik.errors);
  return (
    <Modal show={showModal} onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>Add Holiday</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mt-3">
            <Form.Label htmlFor="holiday_title"> Holiday Name</Form.Label>
            <Form.Control
              type="text"
              id="holiday_title"
              name="holiday_title"
              className="form-control"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="Holiday Name"
            />
            {formik.errors.holiday_title && formik.touched.holiday_title && (
              <div className="text-danger">{formik.errors.holiday_title}</div>
            )}
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label htmlFor="holiday_date"> Holiday Date</Form.Label>
            <DatePicker
              id="holiday_date"
              className=" date_adjust w-100"
              dateFormat="dd/MM/yyyy"
              selected={renderDateOfholidaydate()}
              onBlur={formik.handleBlur}
              onChange={(date) => {
                formik.setFieldValue("holiday_date", date);
                formik.setFieldError("holiday_date", "");
              }}
            />
            {formik.errors.holiday_date && formik.touched.holiday_date && (
              <div className="text-danger">{formik.errors.holiday_date}</div>
            )}
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label htmlFor="holiday_img"> Holiday image</Form.Label>
            <div className="holiday-image text-center">
              <UpadatePhoto
                handleImageAddApiCall={handleImageAddApiCall}
                imageLoader={imageLoader}
              />
            </div>
            {formik.errors.holiday_img && formik.touched.holiday_img && (
              <div className="text-danger">{formik.errors.holiday_img}</div>
            )}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={hideModal}>
          Cancel
        </Button>
        <Button
          className={loading && "submit-btn"}
          variant="btn btn-dark"
          onClick={formik.handleSubmit}
        >
          {loading ? (
            <Spinner animation="border" role="status" size="sm" />
          ) : (
            "Add Holiday"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddHoliday;
