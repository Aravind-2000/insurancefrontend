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
import AgentDetails from "./Components/Agent/AgentDetails";
import OfficeStructure from "./Components/OfficeStructure/OfficeStructure";
import Company from "./Components/Company/Company";
import Login from "./Components/LoginAndSignup/Login";
import AgentLoginDetails from "./Components/LoginAndSignup/AgentLoginDetails";
import Signup from "./Components/LoginAndSignup/Signup";
import MainTree from "./Components/AgentTree/MainTree";
import TrainingDetails from "./Components/TrainingSession/TrainingDetails";
import TraineeAgentDetails from "./Components/TraineeAgent/TraineeAgentDetails";
import TrainingCostDetails from "./Components/TrainingCost/TrainingCostDetails";
import TrainingModuleDetails from "./Components/TrainingModule/TrainingModuleDetails";

const App = () => {
  return (
      <div>
          <Navbar/>
          <div>
              <br/> <br/>
              <Routes>
                  <Route exact path={"/login"} element={<Login/>} />
                  <Route exact path={"signup"} element={<Signup/>} />
                  <Route exact path={"logindetails"} element={<AgentLoginDetails/>} />
                  <Route exact path={"/mainpage"} element={<Mainpage/>} />
                  <Route exact path={"candidates"} element={<ListCandidates/>} />
                  <Route exact path={"add"} element={<AddCandidate/>}/>
                  <Route exact path={"employee"} element={<ListEmployee/>}/>
                  <Route exact path={"emp-dashboard"} element={<EmployeeDashboard/>} />
                  <Route exact path={"notification"} element={<NotificationTable/>} />
                  <Route exact path={"bank"} element={<BankAccount/>} />
                  <Route exact path={"address"} element={<ClientAddress/>} />
                  <Route exact path={"address-add"} element={<ClientAddressAdd/>} />
                  <Route exact path={"client"} element={<ClientDetails/>} />
                  <Route exact path={"agent"} element={<AgentDetails/>} />
                  <Route exact path={"agenttree"} element={<MainTree />} />
                  <Route exact path={"office"} element={<OfficeStructure/>} />
                  <Route exact path={"company"} element={<Company/>} />
                  <Route exact path={"training"} element={<TrainingDetails/>} />
                  <Route exact path={"trainees"} element={<TraineeAgentDetails/>} />
                  <Route exact path={"trainingcost"} element={<TrainingCostDetails/>} />
                  <Route exact path={"trainingmodule"} element={<TrainingModuleDetails/>} />
              </Routes>
          </div>
      </div>
  );
};

export default App;
