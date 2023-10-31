/* eslint-disable no-useless-escape */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Card, Form, Row, Spinner } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import * as Yup from "yup";

import { toast } from "react-toastify";

const Addemployee = () => {
  // const [isLoading, setIsLoadig] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const url = location.pathname;
  const parts = url.split("/");
  const viewEmployee = parts[1];
  const isViewMode = viewEmployee === "view-employee";
  const isEditMode = viewEmployee === "edit-employee";
  const isMyprofileMode = viewEmployee === "my-profile";
  const isPasswordFieldShow = isViewMode || isEditMode || isMyprofileMode;

  const { token } = JSON.parse(localStorage.getItem("userData"));
  const { id } = useParams();
  const headers = {
    authorization: token,
  };

  useEffect(() => {
    if (id) {
      getUserDetails();
    }
  }, [id]);

  const navigate = useNavigate();
  const scrolldisble = (e) => {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
    }
  };
  const MouseScroll = (e) => {
    e.target.blur();
  };

  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required("Please Enter First Name"),
    lastname: Yup.string().required("Please Enter Last Name"),
    email: Yup.string()
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/, "Please enter Valid Email")
      .required("Please Enter Email"),
    mobile_number: Yup.string()
      .min(10)
      .required("Please Enter Mobile Number")
      .test(
        "is-valid",
        "Mobile number must be 10 Digit",
        (value) => value && value.length === 10
      ),
    address: Yup.string().required("Please Enter Address"),
    gender: Yup.string().required("Please Select Gender"),
    department: Yup.string().required("Please Enter Department"),
    joining_date: Yup.string().required("Please Enter Joining Date"),
    birth_date: Yup.string().required("Please Enter Birth Date"),
    role: Yup.string().required("Please Enter Role"),
    password: Yup.string()
      .required(" Please Enter Password")
      .trim()
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,23}$/,
        "Please Enter Valid Password"
      ),
  });

  const editValidationSchema = Yup.object().shape({
    firstname: Yup.string().required("Please Enter First Name"),
    lastname: Yup.string().required("Please Enter Last Name"),
    email: Yup.string()
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/, "Please enter Valid Email")
      .required("Please Enter Email"),
    mobile_number: Yup.string()
      .min(10)
      .required("Please Enter Mobile Number")
      .test(
        "is-valid",
        "Mobile number must be 10 Digit",
        (value) => value && value.length === 10
      ),
    address: Yup.string().required("Please Enter Address"),
    gender: Yup.string().required("Please Select Gender"),
    department: Yup.string().required("Please Enter Department"),
    joining_date: Yup.string().required("Please Enter Joining Date"),
    birth_date: Yup.string().required("Please Enter Birth Date"),
    role: Yup.string().required("Please Enter Role"),
  });

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      mobile_number: "",
      address: "",
      gender: "",
      department: "",
      joining_date: "",
      role: "",
      password: "",
      birth_date: "",
    },
    validationSchema: id ? editValidationSchema : validationSchema,
    onSubmit: async (values) => {
      try {
        const {
          firstname,
          lastname,
          email,
          mobile_number,
          address,
          gender,
          department,
          joining_date,
          role,
          password,
          birth_date,
        } = values || {};
        const body = {
          firstname: firstname.trim(),
          lastname: lastname.trim(),
          email: email.trim(),
          mobile_number: "" + mobile_number,
          address: address.trim(),
          gender: gender.trim(),
          department: department.trim(),
          joining_date: joining_date,
          role: role.trim(),
          password: password.trim(),
          birth_date: birth_date,
        };

        const editBody = {
          firstname: firstname.trim(),
          lastname: lastname.trim(),
          email: email.trim(),
          mobile_number: "" + mobile_number,
          address: address.trim(),
          gender: gender.trim(),
          department: department.trim(),
          joining_date: joining_date,
          role: role.trim(),
          birth_date: birth_date,
        };
        if (id) {
          handleEdit(editBody);
        } else {
          handleSubmit(body);
        }
      } catch (error) {
        console.error("Error while adding employee:", error);
        toast.error("An error occurred while adding the employee");
      }
    },
  });

  const getUserDetails = async () => {
    const response = await axios.get(`http://localhost:3100/api/user/${id}`, {
      headers,
    });
    const { data } = response || {};
    const { data: lastdata, success } = data || {};
    if (success) {
      formik.setFieldValue("firstname", lastdata.firstname);
      formik.setFieldValue("lastname", lastdata.lastname);
      formik.setFieldValue("email", lastdata.email);
      formik.setFieldValue("mobile_number", lastdata.mobile_number);
      formik.setFieldValue("address", lastdata.address);
      formik.setFieldValue("gender", lastdata.gender);
      formik.setFieldValue("department", lastdata.department);
      formik.setFieldValue("role", lastdata.role);
      formik.setFieldValue("joining_date", lastdata.joining_date);
      formik.setFieldValue("password", lastdata.password);
      formik.setFieldValue("birth_date", lastdata.birth_date);
    }
  };

  const handleBack = () => {
    navigate("/employee");
  };

  const handleEdit = async (body) => {
    try {
      setLoading(true);
      const response = await axios.patch(
        `http://localhost:3100/api/user/${id}`,
        body,
        { headers }
      );
      const { data } = response || {};
      const { success, message } = data || {};
      if (response) {
        setLoading(false);
        if (success) {
          toast.success(message);
          setTimeout(() => {
            navigate("/employee");
          });
        } else {
          toast.error(message);
        }
      }
    } catch (err) {
      console.log(" err:", err);
      setLoading(false);
    }
  };

  console.log(formik.errors);
  const handleSubmit = async (body) => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3100/api/user",
        body,
        { headers }
      );
      const { data } = response || {};
      const { success, message } = data || {};
      if (response) {
        setLoading(false);
        if (success) {
          toast.success(message);
          setTimeout(() => {
            navigate("/employee");
          });
        } else {
          toast.error(message);
        }
      }
    } catch (err) {
      console.log(" err:", err);
      setLoading(false);
    }
  };

  const renderDateOfJoing = () => {
    const { joining_date } = formik.values || {};
    if (joining_date) {
      return new Date(joining_date);
    } else {
      return new Date();
    }
  };
  const renderDateOfBirthdate = () => {
    const { birth_date } = formik.values || {};
    if (birth_date) {
      return new Date(birth_date);
    } else {
      return new Date();
    }
  };

  return (
    <div className="d-flex justify-content-center  text-dark bg-transparent ">
      <div className="justify-content-center d-flex w-100 addemployee_image">
        <Row className=" card-size d-flex mt-3 mb-3 align-items-center">
          <Card className="bg-transparent ">
            <Card.Body className="rounded-1-dark card-body1">
              <div>
                <Form className="newadd" onSubmit={formik.handleSubmit}>
                  <Form.Group className="mb-3 text-start newwight">
                    <Form.Label htmlFor="firstname">First Name</Form.Label>
                    <Form.Control
                      type="text"
                      id="firstname"
                      name="firstname"
                      className="form-control"
                      value={formik.values.firstname}
                      placeholder="Enter First Name"
                      onChange={formik.handleChange}
                      disabled={isViewMode}
                    />
                    {formik.errors.firstname && formik.touched.firstname && (
                      <div className="text-danger">
                        {formik.errors.firstname}
                      </div>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3 text-start newwight">
                    <Form.Label htmlFor="lastname">Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      id="lastname"
                      name="lastname"
                      value={formik.values.lastname}
                      className="form-control"
                      placeholder="Enter Last Name"
                      onChange={formik.handleChange}
                      disabled={isViewMode}
                    />
                    {formik.errors.lastname && formik.touched.lastname && (
                      <div className="text-danger">
                        {formik.errors.lastname}
                      </div>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3 text-start newwight">
                    <Form.Label htmlFor="email">Email</Form.Label>
                    <Form.Control
                      type="email"
                      id="email"
                      value={formik.values.email}
                      name="email"
                      className="form-control"
                      placeholder="Enter email"
                      onChange={formik.handleChange}
                      disabled={isViewMode}
                    />
                    {formik.errors.email && formik.touched.email && (
                      <div className="text-danger">{formik.errors.email}</div>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3 text-start newwight">
                    <Form.Label htmlFor="mobileNumber">
                      Mobile Number
                    </Form.Label>
                    <Form.Control
                      type="number"
                      id="mobileNumber"
                      onWheel={MouseScroll}
                      onKeyDown={scrolldisble}
                      value={formik.values.mobile_number}
                      name="mobile_number"
                      className="form-control"
                      placeholder="Enter Mobile Number"
                      {...formik.getFieldProps("mobile_number")}
                      disabled={isViewMode}
                    />
                    {formik.errors.mobile_number &&
                      formik.touched.mobile_number && (
                        <div className="text-danger">
                          {formik.errors.mobile_number}
                        </div>
                      )}
                  </Form.Group>

                  <Form.Group className="mb-3 text-start newwight">
                    <Form.Label htmlFor="birth_date">Birth Date</Form.Label>
                    <DatePicker
                      id="birth_date"
                      dateFormat="dd/MM/yyyy"
                      maxDate={new Date()}
                      selected={renderDateOfBirthdate()}
                      onBlur={formik.handleBlur}
                      onChange={(date) => {
                        formik.setFieldValue("birth_date", date);
                        formik.setFieldError("birth_date", "");
                      }}
                      name="birth_date"
                      className={"form-control form-control-alternative w-100 "}
                      disabled={isViewMode}
                    />
                    {formik.errors.birth_date && formik.touched.birth_date && (
                      <div className="text-danger">
                        {formik.errors.birth_date}
                      </div>
                    )}
                  </Form.Group>
                  {!isPasswordFieldShow && (
                    <Form.Group className="mb-3 text-start newwight">
                      <Form.Label htmlFor="password"> Password</Form.Label>

                      <Form.Control
                        id="password"
                        value={formik.values.password}
                        name="password"
                        type="password"
                        placeholder="Enter password"
                        onChange={formik.handleChange}
                      />

                      {formik.errors.password && formik.touched.password && (
                        <div className="text-danger">
                          {formik.errors.password}
                        </div>
                      )}
                    </Form.Group>
                  )}

                  <Form.Group className="mb-3 text-start newwight">
                    <Form.Label htmlFor="gender">Gender</Form.Label>
                    <Form.Select
                      name="gender"
                      id="gender"
                      value={formik.values.gender}
                      className="form-control"
                      onChange={formik.handleChange}
                      disabled={isViewMode}
                    >
                      <option value="">Select Gender</option>
                      <option value="MALE">Male</option>
                      <option value="FEMALE">Female</option>
                      <option value="OTHER">Other</option>
                    </Form.Select>
                    {formik.errors.gender && formik.touched.gender && (
                      <div className="text-danger">{formik.errors.gender}</div>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3 text-start newwight">
                    <Form.Label htmlFor="department">Department</Form.Label>
                    <Form.Control
                      type="text"
                      id="department"
                      name="department"
                      value={formik.values.department}
                      className="form-control"
                      placeholder="Enter department"
                      onChange={formik.handleChange}
                      disabled={isViewMode}
                    />
                    {formik.errors.department && formik.touched.department && (
                      <div className="text-danger">
                        {formik.errors.department}
                      </div>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3 text-start newwight">
                    <Form.Label htmlFor="role">Role</Form.Label>
                    <Form.Control
                      type="text"
                      id="role"
                      value={formik.values.role}
                      name="role"
                      className="form-control"
                      placeholder="Enter Role"
                      onChange={formik.handleChange}
                      disabled={isViewMode}
                    />
                    {formik.errors.role && formik.touched.role && (
                      <div className="text-danger">{formik.errors.role}</div>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3 text-start newwight">
                    <Form.Label className="d-flex" htmlFor="joining_date">
                      Joining Date
                    </Form.Label>
                    <DatePicker
                      id="joining_date"
                      dateFormat="dd/MM/yyyy"
                      maxDate={new Date()}
                      selected={renderDateOfJoing()}
                      onBlur={formik.handleBlur}
                      onChange={(date) => {
                        formik.setFieldValue("joining_date", date);
                        formik.setFieldError("joining_date", "");
                      }}
                      name="joining_date"
                      className={"form-control form-control-alternative w-100 "}
                      disabled={isViewMode}
                    />
                    {formik.errors.joining_date &&
                      formik.touched.joining_date && (
                        <div className="text-danger">
                          {formik.errors.joining_date}
                        </div>
                      )}
                  </Form.Group>
                  <Form.Group className="mb-3 text-start newwight">
                    <Form.Label htmlFor="address">Address</Form.Label>
                    <Form.Control
                      type="text"
                      id="address"
                      name="address"
                      as="textarea"
                      value={formik.values.address}
                      className="form-control"
                      placeholder="Enter Address"
                      onChange={formik.handleChange}
                      disabled={isViewMode}
                    />
                    {formik.errors.address && formik.touched.address && (
                      <div className="text-danger">{formik.errors.address}</div>
                    )}
                  </Form.Group>
                  <div className="btn-add">
                    <div>
                      <Button variant="info" onClick={handleBack}>Back</Button>
                    </div>
                    {!isViewMode && (
                      <div className="submit-btn">
                        <Button
                          variant="success"
                          type="submit"
                          disabled={loading}
                          className={loading && "submit-btn"}
                        >
                          {loading ? (
                            <Spinner
                              animation="border"
                              role="status"
                              size="sm"
                            />
                          ) : id ? (
                            "Edit Employee"
                          ) : (
                            "Add Employee"
                          )}
                        </Button>
                      </div>
                    )}
                  </div>
                </Form>
              </div>
            </Card.Body>
          </Card>
        </Row>
      </div>
    </div>
  );
};

export default Addemployee;
