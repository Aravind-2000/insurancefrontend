import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Paper} from "@material-ui/core";
import { Modal, Carousel} from "react-bootstrap";
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
        height: "125vh",
        marginLeft:10,
        marginTop:10,
        width:"max-width"

    };

    const paperStyle1 = {
        padding: 20,
        height: "55vh",
        width:600,
        marginTop:20,
        marginLeft: 175
    }

    const paperStyle2 = {
        padding: 20,
        height: "63vh",
        width:600,
        marginTop:20,
        marginLeft: 175
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
        getMyTransactions()
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
            if(res.data !== "UNAUTHORIZED"){
                setMyTrainings(res.data)
            }
        }).catch(err => console.log(err))
    }

    const [myTransaction, setMyTransaction] = useState([]);

    const getMyTransactions = () => {
        InsuranceApi.myTransactions(agentid).then((res) => {
            setMyTransaction(res.data)
        }).catch(err => console.log(err))
    }

    const [userEdit, setUserEdit] = useState(false);
    const [userEditValue, setUserEditValue] = useState("");
    const userEditOpen = (value) => {
        setUserEditValue(value)
        setUserEdit(true)
    }
    const userEditClose = () => {
        setUserEdit(false)
    }



    return (
        <div>
                <div style={{display:"flex", marginLeft:10}}>
                    <div>
                        {
                            access?.find(element => element === "add-permission") ?
                                <Button style={{color: "white", backgroundColor: "blue"}}
                                        onClick={() => showPermission()}>
                                    <SwitchAccessShortcutAddIcon/>
                                </Button> : null
                        }
                    </div>

                    <div>
                        {
                            access?.find(element => element === "do-promote-demote") ?
                                <Button style={{color: "white", backgroundColor: "blue"}}
                                        onClick={() => showPromote()}>
                                    <ImportExportIcon/>
                                </Button> : null
                        }
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <br/>
                        <br/>
                        <Paper elevation={5} style={paperStyle}>
                            <div style={{display:"flex",color: "white", marginLeft:700}}>
                            </div>
                            <h3> Personal Details  </h3>
                            <br/>
                            <h4> User Details  <EditIcon style={{marginLeft:"10px", marginBottom:"2px",cursor:"pointer"}} onClick={() => userEditOpen(userDetails)} />  </h4>
                            <h6> User ID :  {sessionStorage.getItem("userid")} </h6>
                            <h6> User Name :  {userDetails.username} </h6>
                            <h6> User E-Mail : {userDetails.email}  </h6>
                            <h5>  Role Details:  </h5>
                            <h6> Role Name : {userDetails?.role?.roleName} </h6>
                            <br/>
                            <h4> Agent Details </h4>
                            {
                                sessionStorage.getItem("agent") === "null"  ?
                                    <h4> You are not a agent yet. </h4> :  agent === "UNAUTHORIZED" ? <h4> You are Unauthorized </h4> :
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
                                            <h6> Basic Commission : {agent.basicCommission} </h6>
                                            <h6> Service Commission : {agent.servicingCommission} </h6>
                                            <h6> Renewal Commission : {agent.renewalCommission} </h6>
                                            <h6> Commission Class : {agent.commissionClass} </h6>
                                        </>
                            }
                        </Paper>
                    </div>
                    <div className="col">
                        <br/>
                        <div>
                            <h3> My Trainings :- </h3>
                            {
                                sessionStorage.getItem("agent" ) === "null"  ?
                                    <h4> You are not a agent yet. </h4>
                                    :
                                    myTrainings.length === 0 ?
                                        <h5> Currently you don't have any trainings. </h5> :

                                        <Carousel variant="dark" style={{height:600}}>
                                                {
                                                myTrainings?.map((data) => (
                                                    <Carousel.Item  style={{height:700}}>
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
                                                    </Carousel.Item>
                                                ))}
                                        </Carousel>
                            }
                        </div>

                        <div>
                            <h3> My Transactions :-  </h3>
                            {
                                sessionStorage.getItem("agent" ) === "null"  ?
                                    <h4> You are not a agent yet. </h4>
                                    :
                                    myTransaction.length === 0 ?
                                        <h5> You didn't have any transactions yet. </h5> :

                                        <Carousel variant="dark" style={{height:650}}>

                                            {
                                                myTransaction.map((data) => (
                                                    <Carousel.Item style={{height:700}} >

                                                        <Paper elevation={5}  style={paperStyle2} >
                                                            <div style={{color: "black"}}>
                                                                <h6> ID : {data.id} </h6>
                                                                <h6> Receipt ID  : {data.receiptId} </h6>
                                                                <h6> Agent ID  : {data.agentId} </h6>
                                                                <h5> Accounting Rule </h5>
                                                                <h6> ID : {data.receiptReason?.id} </h6>
                                                                <h6> Account Code Details  : {data.receiptReason?.accountCodeTable?.accountCode} - {data.receiptReason?.accountCodeTable?.accountLongDescription} </h6>
                                                                <h6> Sub Account Code Details  : {data.receiptReason?.subAccountTable?.subAccountCode} - {data.receiptReason?.subAccountTable?.subAccountLongDesc} </h6>
                                                                <h5> Transaction Details </h5>
                                                                <h6> Transaction Code : {data.transactionCode?.transactionCode} </h6>
                                                                <h6> Transaction Description  : {data?.transactionCode?.transactionDesc} </h6>
                                                                <h6> Original Currency : {data.originalCurrencyCode?.currencyCode} </h6>
                                                                <h6> Original Amount : {data.originalAmount} </h6>
                                                                <h6> Account Currency  : {data.accountCurrencyCode?.currencyCode} </h6>
                                                                <h6> Account Amount :  {data.accountAmount} </h6>
                                                                <h6> Account Sign : {data.accountSign} </h6>
                                                                <h5> Transaction Description Details</h5>
                                                                <h6> ID : {data.transactionCode?.id} </h6>
                                                                <h6> Transaction Code : {data.transactionCode?.transactionCode} </h6>
                                                                <h6> Transaction Description : {data.transactionCode?.transactionDesc} </h6>
                                                                <h6> Transaction Date and Time : {moment(data.transactionCode?.transactionDate).format("DD-MM-YYYY HH:mm")} </h6>
                                                            </div>
                                                        </Paper>
                                                    </Carousel.Item>
                                                ))}
                                        </Carousel>
                            }
                        </div>
                    </div>
                </div>
            <br/>

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
                    <UpdateUser userid={sessionStorage.getItem("userid")} roles={roles} close={userEditClose} userdetails={userEditValue} setUserdetails={setUserEditValue} />
                </Modal.Body>
            </Modal>




        </div>
    );
};

export default AgentLoginDetails;
