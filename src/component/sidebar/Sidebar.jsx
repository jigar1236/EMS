import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { BsHandbagFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa"; 

const Sidebar = () => {
  const navigate = useNavigate();
  const { _id, firstname, lastname } = JSON.parse(
    localStorage.getItem("userData")
  );

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Log out Successfully");
    setTimeout(() => {
      navigate("/");
    });
  };
  const handleProfile = () => {
    navigate(`/my-profile/${_id}`);
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="bg-dark col-auto col-md-4 vh-100 w-100 d-flex justify-content-between flex-column">
          <div>
            <ul className="nav nav-pills flex-column mt-3 mt-sm-0 ">
              <li className="nav-item text-white fs-4 my-1 py-2 py-sm-0">
                <Link
                  to={"/employee"}
                  className="nav-link text-white  fs-5 mt-4"
                  aria-current="page"
                >
                  <FaUser />
                  <span className="ms-2 d-none d-sm-inline text-white underline">
                    Employee
                  </span>
                </Link>
              </li>
              <li className="nav-item text-white fs-4 my-1 py-2 py-sm-0">
                <Link
                  to={"/holiday"}
                  className="nav-link text-white  fs-5"
                  aria-current="page"
                >
                  <BsHandbagFill />
                  <span className="ms-2 d-none d-sm-inline text-white underline">
                    Holiday
                  </span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="dropdown ">
            <div
              className="text-decoration-none  text-white dropdown-toggle p-3"
              type="button"
              id="triggerId"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <FaUser />
              <span className="ms-2 d-none d-sm-inline">
                {" "}
                {firstname} {lastname}
              </span>
            </div>
            <div className="dropdown-menu" aria-labelledby="triggerId">
              <Button onClick={handleProfile} className="dropdown-item">
                Profile
              </Button>
              <Button onClick={handleLogout} className="dropdown-item ">
                Log Out
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
