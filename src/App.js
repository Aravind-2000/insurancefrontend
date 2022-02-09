import './App.css';
import React from "react";
import {Route,Routes} from "react-router-dom";
import AddCandidate from "./Components/Candidates/AddCandidate";
import ListCandidates from "./Components/Candidates/ListCandidates";
import Mainpage from "./Components/Mainpage";
import Sidebar from "./Components/Sidebar";
import Footer from "./Components/Footer";
import ListEmployee from "./Components/Employee/ListEmployee";
import EmployeeDashboard from "./Components/Employee/EmployeeDashboard";

const App = () => {
  return (
      <div>
          <Sidebar/>
          <div className="container container-md container-lg">
              <Routes>
                  <Route exact path={"/"} element={<Mainpage/>} />
                  <Route exact path={"/candidates"} element={<ListCandidates/>} />
                  <Route  exact path={"/add"} element={<AddCandidate/>}/>
                  <Route  exact path={"/employee"} element={<ListEmployee/>}/>
                  <Route exact path={"/emp-dashboard"} element={<EmployeeDashboard/>} />
              </Routes>
          </div>
      </div>
  );
};

export default App;
