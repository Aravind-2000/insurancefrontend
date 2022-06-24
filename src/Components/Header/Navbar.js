import React, {useState} from 'react';
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
} from './NavbarElements';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {Modal, Navbar, NavDropdown} from "react-bootstrap";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";

const NavBar = () => {
    let navigate = useNavigate();

    // const [username, setUsername] = useState(null);
    //
    // useEffect(() => {
    //     InsuranceApi.getUser(sessionStorage.getItem("userid")).then((res) => {
    //         setUsername(res.data.username)
    //     }).catch(err=>console.log(err))
    // }, [sessionStorage.getItem("userid")]);

    const userId = sessionStorage.getItem("userid");
    const refreshToken  = sessionStorage.getItem("refreshtoken");

    const formSubmit = () => {
        axios.post(`http://localhost:8090/api/auth/logout`, {
            userId, refreshToken
        }).then((res) => {
            sessionStorage.clear()
            localStorage.clear()
            closeModal()
            navigate('/login')
            window.location.reload();
        }).catch((err) => console.log(err))
    }

    const [modal, setModal] = useState(false);
    const closeModal = () => {
        setModal(false)
    }



    return (
        <div>
            <Nav>
                <Navbar.Brand>
                    <NavLink to='mainpage'>
                        <img  src={require("../Logo/futuralogo.png")}   alt="logo"/>
                    </NavLink>
                </Navbar.Brand>

                <Bars />

                <NavMenu>

                    {
                        sessionStorage.getItem("condition") === null ? null :
                            <NavLink to="logindetails">
                                <p style={{color:"white", marginTop:15}}> {sessionStorage.getItem("username")}  </p>
                            </NavLink>
                    }

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
                                <NavDropdown.Item  href="logindetails" >My Dashboard</NavDropdown.Item>
                                <NavDropdown.Item href="emp-dashboard" >Employee Dashboard</NavDropdown.Item>
                                <NavDropdown.Item href="candidates">Enrolled Candidates Details </NavDropdown.Item>
                                <NavDropdown.Item href="employee">Employee Details </NavDropdown.Item>
                                <NavDropdown drop="end" title="Personal Details" >
                                    <NavDropdown.Item href="agent" >Agent Details</NavDropdown.Item>
                                    <NavDropdown.Item href="client" >Client Details</NavDropdown.Item>
                                    <NavDropdown.Item href="bank" >Bank Account Details </NavDropdown.Item>
                                    <NavDropdown.Item href="address">Client Address Details </NavDropdown.Item>
                                </NavDropdown>
                                <NavDropdown drop="end" title="Office and Company Details">
                                    <NavDropdown.Item href="company">Company Details </NavDropdown.Item>
                                    <NavDropdown.Item href="office">Office Details </NavDropdown.Item>
                                    <NavDropdown.Item href="agenttree">Tree Structure </NavDropdown.Item>
                                </NavDropdown>
                                <NavDropdown drop="end" title="Training's Details">
                                    <NavDropdown.Item href="training">Training Session Details </NavDropdown.Item>
                                    <NavDropdown.Item href="trainees">Agent Trainee Details </NavDropdown.Item>
                                    <NavDropdown.Item href="trainingcost"> Training Cost Details </NavDropdown.Item>
                                    <NavDropdown.Item href="trainingmodule"> Training Module Details </NavDropdown.Item>
                                </NavDropdown>
                                <NavDropdown title="Accounting Details" drop="end">
                                    <NavDropdown.Item href="receiptbook"> Receipt Book Details </NavDropdown.Item>
                                    <NavDropdown.Item href="transactionjournal"> Transaction Journal Details </NavDropdown.Item>
                                    <NavDropdown.Item href="accountrule"> Accounting Rule Details </NavDropdown.Item>
                                    <NavDropdown.Item href="accountmaster"> Account Code Details </NavDropdown.Item>
                                    <NavDropdown.Item href="subaccount"> Sub Account Code Details </NavDropdown.Item>
                                    <NavDropdown.Item href="transactioncodes"> Transaction Code Details </NavDropdown.Item>
                                    <NavDropdown.Item href="currencyconversion"> Currency Conversion Details </NavDropdown.Item>
                                    <NavDropdown.Item href="currencycode"> Currency Code Details </NavDropdown.Item>
                                </NavDropdown>
                                <NavDropdown.Item onClick={() => setModal(true)}> Logout </NavDropdown.Item>
                            </NavDropdown>
                            : null
                    }
                </NavMenu>
            </Nav>

            <Modal
                show={modal}
                onHide={closeModal}
                centered
                size="sm">

                <Modal.Header closeButton> </Modal.Header>

                <Modal.Body>
                    Do you want to log out ?
                    <br/>
                    <br/>
                    <Button
                        color="primary"
                        variant="contained"
                        style={{marginRight:10}}
                        onClick={() => formSubmit()}> Yes </Button>
                    <Button
                        color="error"
                        variant="contained"
                        style={{marginRight:10}}
                        onClick={() => closeModal()}> No </Button>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default NavBar;
