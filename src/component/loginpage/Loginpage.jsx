import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { Button, Card, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
// import { useUser } from "./UserContext";

const Loginpage = () => {
  const navigate = useNavigate();
  // const { updateEmpName } = useUser();
  const validationSchema = Yup.object().shape({
    email: Yup.string().trim().required(" Please Enter Email"),
    password: Yup.string()
      .required(" Please Enter password")
      .trim()
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,23}$/,
        "Please Enter Valid Password"
      ),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const { email, password } = values || {};
      const body = {
        email: email.trim(),
        password: password.trim(),
      };
      handleSubmit(body);
    },
  });
  const handleSubmit = async (body) => {
    const response = await axios
      .post("http://localhost:3100/api/login", body)
      .then((res) => {
        const { data } = res || {};
        const { data: lastdata, success, message } = data || {};
        if (success) {
          localStorage.setItem("userData", JSON.stringify(lastdata));
          toast.success(message);
          setTimeout(() => {
            navigate("/employee");
          });
        } else {
          toast.error(message);
        }
      });
    console.log("response", response);
  };
  return (
    <div>
      <div>
        <div className=" image-back bg-light d-flex justify-content-end w-100vw h-100vh">
          <div className="mt-5 w-50  ">
            <Card className=" border_card mt-3 bg-transparent">
              <Card.Body className="border-1-white">
                <div className="mb-2 mt-2 p-3">
                  <h2 className="mb-2 text-center text-white">Login</h2>
                  <div className="mb-3">
                    <Form onSubmit={formik.handleSubmit}>
                      <Form.Group className="mb-3 text-start text-white">
                        <Form.Label htmlFor="email">Email</Form.Label>
                        <Form.Control
                          style={{
                            height: "60px",
                            backgroundColor: "lightgray",
                          }}
                          id="email"
                          name="email"
                          type="text"
                          placeholder="Enter Email"
                          onChange={formik.handleChange}
                        />
                        {formik.errors.email && formik.touched.email && (
                          <div className="text-danger">
                            {formik.errors.email}
                          </div>
                        )}
                      </Form.Group>

                      <Form.Group className="mb-3 text-start text-white">
                        <Form.Label htmlFor="password"> Password</Form.Label>
                        <Form.Control
                          style={{
                            height: "60px",
                            backgroundColor: "lightgray",
                          }}
                          id="password"
                          name="password"
                          type="password"
                          placeholder=" Enter Password"
                          onChange={formik.handleChange}
                        />
                        {formik.errors.password && formik.touched.password && (
                          <div className="text-danger">
                            {formik.errors.password}
                          </div>
                        )}
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <p className="small">
                          <Link
                            className="text-primary underline"
                            to="/Forgotpassword"
                          >
                            Forgot password?
                          </Link>
                        </p>
                      </Form.Group>

                      <div className="d-grid">
                        <Button
                          onClick={onsubmit}
                          variant="primary"
                          type="submit"
                        >
                          Login
                        </Button>
                      </div>
                    </Form>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loginpage;
