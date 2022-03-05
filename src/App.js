import './App.css';
import React from "react";
import {Route,Routes} from "react-router-dom";
import AddCandidate from "./Components/Candidates/AddCandidate";
import ListCandidates from "./Components/Candidates/ListCandidates";
import Mainpage from "./Components/Mainpage";
import ListEmployee from "./Components/Employee/ListEmployee";
import EmployeeDashboard from "./Components/Employee/EmployeeDashboard";
import Navbar from "./Components/Header/Navbar";
import NotificationTable from "./Components/Notification/NotificationTable";
import BankAccount from "./Components/BankAccount/BankAccount";
import ClientAddress from "./Components/Address/ClientAddress";
import ClientDetails from "./Components/Client/ClientDetails";
import ClientAddressAdd from "./Components/Address/ClientAddressAdd";

const App = () => {
  return (
      <div>
          <Navbar/>
          <div>
              <br/> <br/>
              <Routes>
                  <Route exact path={"/"} element={<Mainpage/>} />
                  <Route exact path={"/candidates"} element={<ListCandidates/>} />
                  <Route  exact path={"/add"} element={<AddCandidate/>}/>
                  <Route  exact path={"/employee"} element={<ListEmployee/>}/>
                  <Route exact path={"/emp-dashboard"} element={<EmployeeDashboard/>} />
                  <Route exact path={"/notification"} element={<NotificationTable/>} />
                  <Route exact path={"/bank"} element={<BankAccount/>} />
                  <Route exact path={"/address"} element={<ClientAddress/>} />
                  <Route exact path={"/address-add"} element={<ClientAddressAdd/>} />
                  <Route exact path={"/client"} element={<ClientDetails/>} />
              </Routes>
          </div>
      </div>
  );
};

export default App;
