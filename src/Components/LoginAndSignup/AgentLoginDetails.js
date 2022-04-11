import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Paper} from "@material-ui/core";
import {Row, Col, Modal} from "react-bootstrap";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';

const AgentLoginDetails = () => {
    let navigate = useNavigate();

    const btnstyle = { margin: "8px 0" , marginLeft: "1.5rem"};
    const paperStyle = {
        padding: 20,
        height: "150vh",
        width: 1000,
        margin: "10px 400px auto",
    };

    const agentid = sessionStorage.getItem("agent");
    const userid = sessionStorage.getItem("userid");
    const [agent, setAgent] = useState("");

    useEffect(() => {
        getAgent()
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

    return (
        <div>

            <Paper elevation={10} style={paperStyle}>
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

export default AgentLoginDetails;
