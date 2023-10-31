import React from "react";
import { Card, Form, Col, Button } from "react-bootstrap";
import {  useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const Forgetpassword = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string().required("Please Enter email"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: () => {
      navigate("/resetpassword");
    },
  });
  const handleOut = () => [navigate("/")];

  return (
    <div className="  image-back  d-flex justify-content-center align-items-center">
      <div className="w-50 ">
        <Col>
          <div>
            <Card className=" border_cardforget bg-transparent">
              <Card.Body className=" border-1-white">
                <div className="mb-6  p-3  gap-3">
                  <h2 className="mb-1 mt 2 text-center text-white">
                    Forgot Password
                  </h2>
                  <Form onSubmit={formik.handleSubmit}>
                    <Form.Group className="mb-2 text-start text-white">
                      <Form.Label htmlFor="email">Email</Form.Label>
                      <Form.Control
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        placeholder="Enter your email"
                        onChange={formik.handleChange}
                      />
                      {formik.errors.email && formik.touched.email && (
                        <div className="text-danger">{formik.errors.email}</div>
                      )}
                    </Form.Group>
                    <div className="mt-3">
                      <div className=" d-flex justify-content-center text-center text-white">
                        <Button
                          className=" text-center text-white"
                          variant="primary"
                          type="submit"
                        >
                          Forgot Password
                        </Button>
                        <div className="w-25 ">
                          <Button
                            variant="primary"
                            type="submit"
                            onClick={handleOut}
                          >
                            Back to Login
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Form>
                </div>
              </Card.Body>
            </Card>
          </div>
        </Col>
      </div>
    </div>
  );
};

export default Forgetpassword;
