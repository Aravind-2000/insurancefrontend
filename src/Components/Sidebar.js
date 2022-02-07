import React, { useState } from "react";
import {
    ProSidebar,
    Menu,
    MenuItem,
    SidebarHeader,
    SidebarFooter,
    SidebarContent
} from "react-pro-sidebar";
import{Link} from "react-router-dom";
import {
    FiHome,
    FiLogOut,
    FiUsers
} from "react-icons/fi";
import { BiUserPlus} from "react-icons/bi";
import "../CSS/Header.css";
import "react-pro-sidebar/dist/css/styles.css";
import {AiOutlineMenuFold, AiOutlineMenuUnfold} from "react-icons/ai";

const Sidebar = () => {

    const [menuCollapse, setMenuCollapse] = useState(true);

    const menuIconClick = () => {
        menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
    };

    return (
        <div>
                    <div id="header">
                        <ProSidebar collapsed={menuCollapse}>
                            <SidebarHeader>
                                <div className="logotext">
                                    <h4 style={{color: "whitesmoke", marginLeft:10}} >{menuCollapse ? "FI" : "FuturaInstech"}</h4>
                                </div>

                                <div className="closemenu" onClick={menuIconClick} style={{marginRight:30, backgroundColor: "whitesmoke"}} >
                                    {menuCollapse ? <AiOutlineMenuUnfold /> : <AiOutlineMenuFold />}
                                </div>
                                <br />
                            </SidebarHeader>
                            <SidebarContent>
                                <Menu iconShape="square">
                                    <MenuItem   icon={<FiHome />}>
                                        <Link to={'/'} style={{color:"red"}}> Home </Link>
                                    </MenuItem>
                                    <MenuItem icon={<FiUsers />}> <Link to={"/candidates"} style={{decoration:"none", color:"red"}} > Candidates</Link> </MenuItem>
                                    <MenuItem icon={<FiUsers />}> <Link to={"/employee"} style={{decoration:"none", color:"red"}} > Employees </Link> </MenuItem>
                                    <MenuItem icon={<BiUserPlus />}> <Link to={"/add"} style={{decoration:"none", color:"red"}} > Enroll Now </Link> </MenuItem>
                                </Menu>
                            </SidebarContent>
                            {/*<SidebarFooter>*/}
                            {/*    <Menu iconShape="square">*/}
                            {/*        <MenuItem icon={<FiLogOut />}>Logout</MenuItem>*/}
                            {/*    </Menu>*/}
                            {/*</SidebarFooter>*/}
                        </ProSidebar>
                    </div>
        </div>
    );
};

export default Sidebar;
