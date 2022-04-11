import React, {useState} from 'react';
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
} from './NavbarElements';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { NavDropdown} from "react-bootstrap";

const Navbar = () => {

    const item = sessionStorage.getItem("condition")

    const [navigation, setNavigation] = useState("");

    const putNavigation = (val) => {
        setNavigation(val)
    }

    return (
        <div>
            <Nav>
                <NavLink to='/'>
                    <img  src={require("../Logo/futuralogo.png")}   alt="logo"/>
                </NavLink>
                <Bars />

                <NavMenu>
                    {
                        item === "true" ? null :

                            <NavLink to="login" activeStyle>
                                <AccountCircleIcon/>
                            </NavLink>}
                    <NavLink to="/logindetails" activeStyle>
                        <p style={{color:"white", marginTop:15}}>  {sessionStorage.getItem("username")} </p>
                    </NavLink>
                    {
                        item === "true" ?
                            <NavDropdown  title={navigation}>
                                <NavDropdown.Item href="/emp-dashboard" >My Dashboard</NavDropdown.Item>
                                <NavDropdown.Item href="/agent"  onClick={() => putNavigation("Agent Details")}>Agent Details</NavDropdown.Item>
                                <NavDropdown.Item href="/client" onClick={() => putNavigation("Client Details")}>Client Details</NavDropdown.Item>
                                <NavDropdown.Item href="/bank" >Bank Account Details </NavDropdown.Item>
                                <NavDropdown.Item href="address">Client Address Details </NavDropdown.Item>
                                <NavDropdown.Item href="/candidates">Enrolled Candidates Details </NavDropdown.Item>
                                <NavDropdown.Item href="/employee">Employee Details </NavDropdown.Item>
                                <NavDropdown.Item href="/company">Company Details </NavDropdown.Item>
                                <NavDropdown.Item href="/office">Office Details </NavDropdown.Item>
                            </NavDropdown>

                            : null
                    }


                    {/*<NavLink to='/add' activeStyle>*/}
                    {/*    Enroll Now*/}
                    {/*</NavLink>*/}
                    {/*<NavLink to='/candidates' activeStyle>*/}
                    {/*    Candidates*/}
                    {/*</NavLink>*/}
                    {/*<NavLink to='/employee' activeStyle>*/}
                    {/*    Employees*/}
                    {/*</NavLink>*/}
                    {/*<NavLink to='/emp-dashboard' activeStyle>*/}
                    {/*    Dashboard*/}
                    {/*</NavLink>*/}
                    {/*<NavLink to="/bank" activeStyle>*/}
                    {/*    Bank Accounts*/}
                    {/*</NavLink>*/}
                    {/*<NavLink to="/address" activeStyle>*/}
                    {/*    Address*/}
                    {/*</NavLink>*/}
                    {/*<NavLink to="/client" activeStyle>*/}
                    {/*    Clients*/}
                    {/*</NavLink>*/}
                    {/*<NavLink to="/agent" activeStyle>*/}
                    {/*    Agent*/}
                    {/*</NavLink>*/}
                    {/*<NavLink to="/office" activeStyle>*/}
                    {/*    Offices*/}
                    {/*</NavLink>*/}
                    {/*<NavLink to="/company" activeStyle>*/}
                    {/*    Company*/}
                    {/*</NavLink>*/}
                    {/*{*/}
                    {/*    item === "true" ?*/}
                    {/*        <NavLink to="/logout" activeStyle>*/}
                    {/*            <p style={{color:"white", marginTop:15, marginLeft:50}}> LogOut </p>*/}
                    {/*        </NavLink> : null*/}
                    {/*}*/}
                </NavMenu>
                {/*<NavBtn>*/}
                {/*    <NavLink>Sign In</NavLink>*/}
                {/*</NavBtn>*/}
            </Nav>

        </div>
    );
};

export default Navbar;
