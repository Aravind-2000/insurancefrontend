import React from 'react';
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink
} from './NavbarElements';

const Navbar = () => {
    return (
        <div>
            <Nav>
                <NavLink to='/'>
                    <img  src={require("../Logo/futuralogo.png")}   alt="logo"/>
                </NavLink>
                <Bars />
                <NavMenu>
                    <NavLink to='/add' activeStyle>
                        Enroll Now
                    </NavLink>
                    <NavLink to='/candidates' activeStyle>
                        Candidates
                    </NavLink>
                    <NavLink to='/employee' activeStyle>
                        Employees
                    </NavLink>
                    <NavLink to='/emp-dashboard' activeStyle>
                        Dashboard
                    </NavLink>
                    <NavLink to="/bank" activeStyle>
                        Bank Accounts
                    </NavLink>
                    <NavLink to="/address" activeStyle>
                        Address
                    </NavLink>
                    <NavLink to="/client" activeStyle>
                        Clients
                    </NavLink>
                </NavMenu>
                {/*<NavBtn>*/}
                {/*    <NavBtnLink to='/signin'>Sign In</NavBtnLink>*/}
                {/*</NavBtn>*/}
            </Nav>

        </div>
    );
};

export default Navbar;
