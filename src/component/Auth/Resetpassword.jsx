import React from "react";
import { Col, Button, Card, Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Resetpassword = () => {
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    newpassword: Yup.string()
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,23}$/,
        "Please Enter Valid Password"
      )
      .required("Please Enter New Password"),
    comfirmpassword: Yup.string()
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,23}$/,
        "Please Enter Valid Password"
      )
      .required(" Please Enter Confirm Password"),
  });
  const formik = useFormik({
    initialValues: {
      newpassword: "",
      comfirmpassword: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const { newpassword, comfirmpassword } = values || {};
      if (newpassword !== comfirmpassword) {
        toast.error("Passwords do not match");
      } else {
        toast.success("Password Reset Successfully");
        setTimeout(() => {
          navigate("/");
        });
      }
    },
  });
  const handleBack = () => {
    navigate("/forgotpassword");
  };

  return (
    <div>
      <div>
        <div className=" image-back bg-light d-flex justify-content-end w-100vw h-100vh">
          <div className=" w-50  ">
            <Col>
              <Card className=" border_card mt-5 bg-transparent">
                <Card.Body className="border-1-white">
                  <div className="mb-3 mt-4 p-5">
                    <h2 className="mb-2 text-center text-white">
                      Reset Password
                    </h2>

                    <div className="mb-3">
                      <Form onSubmit={formik.handleSubmit}>
                        <Form.Group className="mb-3 text-start">
                          <Form.Label
                            className="text-white"
                            htmlFor="new password"
                          >
                            {" "}
                            New Password*
                          </Form.Label>
                          <Form.Control
                            style={{
                              height: "60px",
                            }}
                            id="new password"
                            name="newpassword"
                            type="Password"
                            placeholder="Enter new password"
                            onChange={formik.handleChange}
                          />
                          {formik.errors.newpassword &&
                            formik.touched.newpassword && (
                              <div className="text-danger">
                                {formik.errors.newpassword}
                              </div>
                            )}
                        </Form.Group>

                        <Form.Group
                          className="mb-3 text-start"
                          controlId="formBasicPassword"
                        >
                          <Form.Label
                            className="mb-2 text-white"
                            htmlFor="comfirm password"
                          >
                            Confirm Password*
                          </Form.Label>
                          <Form.Control
                            style={{
                              height: "60px",
                            }}
                            id="comfirm password"
                            name="comfirmpassword"
                            type="password"
                            placeholder=" Comfirm Password"
                            onChange={formik.handleChange}
                          />

                          {formik.errors.comfirmpassword &&
                            formik.touched.comfirmpassword && (
                              <div className="text-danger">
                                {formik.errors.comfirmpassword}
                              </div>
                            )}
                        </Form.Group>
                        <Form.Group
                          className="mb-3 mt-4"
                          controlId="formBasicCheckbox"
                        ></Form.Group>
                        <div className="d-grid">
                          <Button variant="primary" type="submit">
                            Reset password
                          </Button>
                        </div>
                        <div className="d-flex justify-content-center mt-3">
                          <Button
                            variant="primary"
                            type="submit"
                            onClick={handleBack}
                          >
                            Back
                          </Button>
                        </div>
                      </Form>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Resetpassword;
