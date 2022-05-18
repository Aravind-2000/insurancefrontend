import React, {useEffect, useState} from 'react';
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
} from './NavbarElements';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { NavDropdown} from "react-bootstrap";
import InsuranceApi from "../../Service/InsuranceApi";

const Navbar = () => {



    // const [username, setUsername] = useState(null);
    //
    // useEffect(() => {
    //     InsuranceApi.getUser(sessionStorage.getItem("userid")).then((res) => {
    //         setUsername(res.data.username)
    //     }).catch(err=>console.log(err))
    // }, [sessionStorage.getItem("userid")]);


    return (
        <div>
            <Nav>
                <NavLink to='/'>
                    <img  src={require("../Logo/futuralogo.png")}   alt="logo"/>
                </NavLink>
                <Bars />

                <NavMenu>
                   <NavLink to="logindetails">
                       <p style={{color:"white", marginTop:15}}> {sessionStorage.getItem("username")}  </p>
                   </NavLink>
                    {
                        sessionStorage.getItem("condition") === null ?
                            <>
                            <NavLink to="login" activeStyle>
                                <AccountCircleIcon/>
                            </NavLink>
                            </>
                            : null
                    }

                    {
                        sessionStorage.getItem("condition") !== null ?
                            <NavDropdown  title="Navigation">
                                <NavDropdown.Item href="logindetails" >My Dashboard</NavDropdown.Item>
                                <NavDropdown.Item href="emp-dashboard" >Employee Dashboard</NavDropdown.Item>
                                <NavDropdown.Item href="agent" >Agent Details</NavDropdown.Item>
                                <NavDropdown.Item href="client" >Client Details</NavDropdown.Item>
                                <NavDropdown.Item href="bank" >Bank Account Details </NavDropdown.Item>
                                <NavDropdown.Item href="address">Client Address Details </NavDropdown.Item>
                                <NavDropdown.Item href="candidates">Enrolled Candidates Details </NavDropdown.Item>
                                <NavDropdown.Item href="employee">Employee Details </NavDropdown.Item>
                                <NavDropdown.Item href="company">Company Details </NavDropdown.Item>
                                <NavDropdown.Item href="office">Office Details </NavDropdown.Item>
                                <NavDropdown.Item href="agenttree">Tree Structure </NavDropdown.Item>
                                <NavDropdown.Item href="training">Training Session Details </NavDropdown.Item>
                                <NavDropdown.Item href="trainees">Agent Trainee Details </NavDropdown.Item>
                                <NavDropdown.Item href="trainingcost"> Training Cost Details </NavDropdown.Item>
                                <NavDropdown.Item href="trainingmodule"> Training Module Details </NavDropdown.Item>
                            </NavDropdown>

                            : null
                    }
                </NavMenu>
            </Nav>

        </div>
    );
};

export default Navbar;
