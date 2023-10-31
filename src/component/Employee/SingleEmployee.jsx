// import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import employeeDataJson from "../../Employee.json";
import { Card, Button} from "react-bootstrap";

const SingleEmployee = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const employee = employeeDataJson.employeeList.find(
    (emp) => emp.employeeId === id
  );

  const onsubmit = () => {
    navigate("/employee");
  };

  return (
    <div className=" background-card h5 ">
    
      <Card className="card-modi singlepage-back text-white">
        {employee ? (
          <div className="mt-4 mb-3">
            <h1>
              {employee.firstName} {employee.lastName}
            </h1>
            <hr />

            <p>
              <b>Email :</b> {employee.email}
            </p>
            <p>
              <b>Employee ID :</b> {employee.employeeId}
            </p>
            <p>
              <b>Mobile Number :</b> {employee.mobileNumber}
            </p>
            <p>
              <b>Address : </b> {employee.address}
            </p>
            <p>
              <b>Gender :</b> {employee.gender}
            </p>
            <p>
              <b>Department :</b> {employee.department}
            </p>
            <p>
              <b>Joining Date :</b> {employee.joiningDate}
            </p>
            <p>
              <b>Salary : </b> {employee.salary}
            </p>
          </div>
        ) : (
          <p>Employee not found</p>
        )}
        <Button  className="mb-4 " onClick={onsubmit} variant="primary" type="submit">
          Back
        </Button>
      </Card>
    </div>
  );
};

export default SingleEmployee;
