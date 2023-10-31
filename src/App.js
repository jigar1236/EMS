import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loginpage from "./component/loginpage/Loginpage";
import Forgetpassword from "./component/Auth/Forgetpassword";
import Resetpassword from "./component/Auth/Resetpassword";
import Employeepage from "./component/Employee/Employeepage";
import Addemployee from "./component/Employee/Addemployee";
import HolidayPage from "./component/holiday/HolidayPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Loginpage />} />
          <Route path="/forgotpassword" element={<Forgetpassword />} />
          <Route path="/resetpassword" element={<Resetpassword />} />
          <Route path="/employee" element={<Employeepage />} />
          <Route path="add-employee" element={<Addemployee />} />
          <Route path="view-employee/:id" element={<Addemployee />} />
          <Route path="edit-employee/:id" element={<Addemployee />} />
          <Route path="my-profile/:id" element={<Addemployee />} />
          <Route path="holiday" element={<HolidayPage />} />
        </Routes>
      </BrowserRouter>

      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="dark"
      />
    </>
  );
}

export default App;
