import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Paper} from "@material-ui/core";
import {Row, Col, Modal} from "react-bootstrap";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import SwitchAccessShortcutAddIcon from '@mui/icons-material/SwitchAccessShortcutAdd';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import PermissionsUI from "./PermissionsUI";
import PromoteDemote from "./PromotionDemotion";
import InsuranceApi from "../../Service/InsuranceApi";
import moment from "moment";
import EditIcon from "@mui/icons-material/Edit";
import UpdateUser from "./UpdateUser";

const AgentLoginDetails = () => {
    let navigate = useNavigate();


    const paperStyle = {
        padding: 20,
        height: "120vh",
        width: 1000,
        margin: "10px 400px auto",
    };

    const paperStyle1 = {
        padding: 20,
        height: "55vh",
        width: 1000,
        margin: "20px 0px 20px 400px"
    }

    const agentid = sessionStorage.getItem("agent");
    const userid = sessionStorage.getItem("userid");
    const [agent, setAgent] = useState("");
    const [roles, setRoles] = useState([]);
    const [userDetails, setUserDetails] = useState("");


    useEffect(() => {
        getAgent()
        getMyTrainings()
        axios.get("http://localhost:8090/role/getall").then((res) => {
            setRoles(res.data);
        }).catch((err) => console.log(err))
        InsuranceApi.getUser(userid).then((res) => {
            setUserDetails(res.data)
        }).catch(err => console.log(err))
    }, []);


    const getAgent = () => {
        axios.get(`http://localhost:8090/agent/${agentid}/${userid}`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`
            }
        }).then((res) => {
            setAgent(res.data)
        }).catch((err) => console.log(err))
    }

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

    const access = JSON.parse(sessionStorage.getItem("specialaccess"))

    const [permission, setPermission] = useState(false);
    const closePermission = () => {
        setPermission(false)
    }
    const showPermission = () => {
        setPermission(true)
    }

    const [promoteDemote, setPromoteDemote] = useState(false);
    const closePromote = () => {
        setPromoteDemote(false)
    }
    const showPromote = () => {
        setPromoteDemote(true)
    }

    const [myTrainings, setMyTrainings] = useState([]);

    const getMyTrainings = () => {
        const agentId = sessionStorage.getItem("agent")
        InsuranceApi.getMyTrainings(agentId).then((res) => {
            setMyTrainings(res.data)
        }).catch(err => console.log(err))
    }

    const [userEdit, setUserEdit] = useState(false);
    const userEditOpen = () => {
        setUserEdit(true)
    }
    const userEditClose = () => {
        setUserEdit(false)
    }



    return (
        <div>
                {
                    access?.find(element => element === "add-permission") ?
                        <Button style={{color: "white", backgroundColor: "blue", marginLeft: 400}}
                                onClick={() => showPermission()}>
                            <SwitchAccessShortcutAddIcon/>
                        </Button> : null
                }

                {
                    access?.find(element => element === "do-promote-demote") ?
                        <Button style={{color: "white", backgroundColor: "blue", marginLeft: 100}}
                                onClick={() => showPromote()}>
                            <ImportExportIcon/>
                        </Button> : null
                }

            <Paper elevation={5} style={paperStyle}>
                <div style={{display:"flex",color: "white", marginLeft:850}}>
                    <Button
                        color="error"
                        variant="contained"
                        style={{paddingLeft:60, paddingRight: 55}}
                        onClick={() => setModal(true)}>
                    <h6> LOGOUT </h6>
                    <LogoutIcon
                        style={{  marginLeft:10, cursor:"pointer"}}
                    /></Button>
                </div>
                <h3> Personal Details  </h3>
                <br/>
                <h4> User Details  <EditIcon style={{marginLeft:"10px", marginBottom:"2px",cursor:"pointer"}} onClick={() => userEditOpen()} />  </h4>
                <h6> User ID :  {sessionStorage.getItem("userid")} </h6>
                <h6> User Name :  {userDetails.username} </h6>
                <h6> User E-Mail : {userDetails.email}  </h6>
                <h5>  Role Details:  </h5>
                <h6> Role Name : {userDetails?.role?.roleName} </h6>
                <br/>
                <h4> Agent Details </h4>
                {
                    sessionStorage.getItem("agent") === null ?

                        <h4> You are not a agent yet. </h4> :

                        <>
                        <h6> Agent ID  : {agent.id} </h6>
                        <h6> Agent Name: {agent.client?.givenName} {agent.client?.surName} </h6>
                        <h6> Gender : {agent.client?.gender} </h6>
                        <h6> Agent Personal Mail : {agent.client?.email} </h6>
                        <h6> Agent Personal Number : {agent.client?.mobileNumber} </h6>
                        <h6> Agent Occupation : {agent.client?.occupation} </h6>
                        <br/>
                        <h5> Agent Type Description </h5>
                        <h6> Agent Description : {agent.agentTypeLevel?.agentLevelDesc} - {agent.agentTypeLevel?.agentLevelId} </h6>
                        <br/>
                        <h5>  Address Details </h5>
                        <h6> Address : {agent.client?.address?.addressLine1} {agent.client?.address?.addressLine2}  {agent.client?.address?.city} ,  {agent.client?.address?.state} ,  {agent.client?.address?.country}. </h6>
                        <h6> City : {agent.client?.address?.city} </h6>
                        <h6>  State: {agent.client?.address?.state} </h6>
                        <h6> Postal Code : {agent.client?.address?.pincode} </h6>
                        <h6> Address Type  : {agent.client?.address?.addressType} </h6>
                        <br/>
                        <h5>  Bank Details </h5>
                        <h6> Account Number : {agent?.client?.bankAccount?.accountNumber} </h6>
                        <h6> Account Holder Name : {agent?.client?.bankAccount?.accountHolderName} </h6>
                        <h6> IFSC Code : {agent?.client?.bankAccount?.ifscCode} </h6>
                        <h6> Bank Name : {agent?.client?.bankAccount?.bankName} </h6>
                        <h6> Bank Branch : {agent?.client?.bankAccount?.bankBranch} </h6>
                        <br/>
                        <h5> Commission Class </h5>
                        <Row>
                        <Col>
                        <h6> Basic Commission : {agent.basicCommission} </h6>
                        </Col>
                        <Col>
                        <h6> Service Commission : {agent.servicingCommission} </h6>
                        </Col>
                        <Col>
                        <h6> Renewal Commission : {agent.renewalCommission} </h6>
                        </Col>
                        <Col>
                        <h6>  Commission Class : {agent.commissionClass} </h6>
                        </Col>
                        </Row>
                        </>
                }
            </Paper>

            <br/>
            <div>
                <h3 style={{marginLeft:375}}> My Trainings :- </h3>
                {
                    sessionStorage.getItem("agent" ) === null ?
                        <p> You are not a agent yet... </p>
                        :
                            myTrainings === null ?
                            <h4> Currently you don't have any trainings </h4> :
                            myTrainings?.map((data) => (
                                <>
                                    <Paper elevation={5} style={paperStyle1}>
                                        <div style={{color: "black"}}>

                                            <p> <h6> Training ID : {data.trainingId} </h6> </p>
                                            <p> <h6> Training Topic : {data?.training?.trainingModule?.trainingTopic} </h6> </p>
                                            <p> <h6> Training Description : {data?.training?.trainingModule?.trainingDesc} </h6> </p>
                                            <p> <h6> Training Mode : {data?.training?.trainingMode} </h6> </p>
                                            <p> <h6> Training Type : {data?.training?.trainingType} </h6> </p>
                                            <p>  <h6> Training time : {data?.training?.trainingTime} </h6> </p>


                                            <h4> General Details </h4>
                                            <h6> Is Approved : {data.isApproved} </h6>
                                            <h6> Approved By : {data.approvedByAgent?.client?.givenName} {data.approvedByAgent?.client?.surName} </h6>
                                            <h6> Approved Date : {moment(data.approvedDate).format("DD-MMM-YYYY")} </h6>
                                            <h6> Total Days : {data.totalDays} </h6>
                                            <h6> Total Days Attended : {data.daysAttended} </h6>
                                            <h6> Training Score : {data.trainingScore} </h6>
                                            <h6> Training Status : {data.trainingStatus} </h6>
                                            <h6> Comments : {data.comments} </h6>
                                        </div>
                                    </Paper>
                                </>
                            ))
                }


            </div>

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


            <Modal
                show={permission}
                onHide={closePermission}
                centered
                size="lg">

                <Modal.Header closeButton> <Modal.Title> Add Permission </Modal.Title> </Modal.Header>

                <Modal.Body>
                    <PermissionsUI close={closePermission}/>
                </Modal.Body>
            </Modal>

            <Modal
                show={promoteDemote}
                onHide={closePromote}
                centered
                size="sm">

                <Modal.Header closeButton> <Modal.Title> <h5> Promotion / Demotion </h5> </Modal.Title> </Modal.Header>

                <Modal.Body>
                    <PromoteDemote close={closePromote}/>
                </Modal.Body>
            </Modal>


            <Modal
                show={userEdit}
                onHide={userEditClose}
                centered
                size="lg">

                <Modal.Header closeButton> <Modal.Title> <h5> Edit User Details </h5> </Modal.Title> </Modal.Header>
                <Modal.Body>
                    <UpdateUser userid={sessionStorage.getItem("userid")} roles={roles} close={userEditClose}/>
                </Modal.Body>
            </Modal>




        </div>
    );
};

export default AgentLoginDetails;
