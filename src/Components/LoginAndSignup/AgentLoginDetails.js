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

const AgentLoginDetails = () => {
    let navigate = useNavigate();


    const paperStyle = {
        padding: 20,
        height: "150vh",
        width: 1000,
        margin: "10px 400px auto",
    };

    const paperStyle1 = {
        padding: 20,
        height: "50vh",
        width: 1000,
        margin: "20px 0px 20px 400px"
    }

    const agentid = sessionStorage.getItem("agent");
    const userid = sessionStorage.getItem("userid");
    const [agent, setAgent] = useState("");

    useEffect(() => {
        getAgent()
        getMyTrainings()
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
                <h4> User Details   </h4>
                <p> User ID :  {sessionStorage.getItem("userid")} </p>
                <p> User Name :  {sessionStorage.getItem("username")} </p>
                <p> User E-Mail :  {sessionStorage.getItem("email")} </p>
                <br/>
                <h4> Agent Details </h4>
                <p> Agent ID  : {agent.id} </p>
                <p> Agent Name: {agent.client?.givenName} {agent.client?.surName} </p>
                <p> Gender : {agent.client?.gender} </p>
                <p> Agent Personal Mail : {agent.client?.email} </p>
                <p> Agent Personal Number : {agent.client?.mobileNumber} </p>
                <p> Agent Occupation : {agent.client?.occupation} </p>
                <br/>
                <h5> Agent Type Description </h5>
                <p> Agent Description : {agent.agentTypeLevel?.agentLevelDesc} - {agent.agentTypeLevel?.agentLevelId} </p>
                <br/>
                <h5> Client Address Details </h5>
                <p> Address : {agent.client?.address?.addressLine1} {agent.client?.address?.addressLine2}  {agent.client?.address?.city} ,  {agent.client?.address?.state} ,  {agent.client?.address?.country}. </p>
                <p> City : {agent.client?.address?.city} </p>
                <p>  State: {agent.client?.address?.state} </p>
                <p> Postal Code : {agent.client?.address?.pincode} </p>
                <p> Address Type  : {agent.client?.address?.addressType} </p>
                <br/>
                <h5> Client Bank Details </h5>
                <p> Account Number : {agent?.client?.bankAccount?.accountNumber} </p>
                <p> Account Holder Name : {agent?.client?.bankAccount?.accountHolderName} </p>
                <p> IFSC Code : {agent?.client?.bankAccount?.ifscCode} </p>
                <p> Bank Name : {agent?.client?.bankAccount?.bankName} </p>
                <p> Bank Branch : {agent?.client?.bankAccount?.bankBranch} </p>
                <br/>
                <h5> Commission Class </h5>
                <Row>
                    <Col>
                        <p> Basic Commission : {agent.basicCommission} </p>
                    </Col>
                    <Col>
                        <p> Service Commission : {agent.servicingCommission} </p>
                    </Col>
                    <Col>
                        <p> Renewal Commission : {agent.renewalCommission} </p>
                    </Col>
                    <Col>
                        <p>  Commission Class : {agent.commissionClass} </p>
                    </Col>
                </Row>
            </Paper>

            <br/>
            <div>
                <h3 style={{marginLeft:375}}> My Trainings :- </h3>
                {
                    myTrainings.map((data) => (
                        <>
                            <Paper elevation={5} style={paperStyle1}>
                                <div style={{color: "black"}}>

                                    <p> <h6> Training ID : {data.trainingId} </h6> </p>
                                    <p> <h6> Training Topic : {data?.training?.trainingTopic} </h6> </p>
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


        </div>
    );
};

export default AgentLoginDetails;
