import React, {useState, useEffect} from 'react';
import InsuranceApi from "../../Service/InsuranceApi";
import {Button, Form} from "react-bootstrap";
import moment from "moment";
import "../../CSS/MyStyles.css"
import {BsFileEarmarkPlus} from "react-icons/bs";
import CandidateMarkingSystem from "../Candidates/CandidateMarkingSystem";

const EmployeeDashboard = () => {

    const [employees, setEmployees] = useState([]);
    const [employee, setEmployee] = useState(" ");
    const [candidate, setCandidate] = useState([]);
    const [empid, setEmpid] = useState(0);

    const [markId, setMarkId] = useState(0);
    const [markName, setMarkName] = useState("");
    const [markcandidate, setMarkcandidate] = useState(" ");
    const [marking, setMarking] = useState(false);
    const markingOpen = (quants,id, name) => {
        setMarkId(id);
        setMarkName(name)
        setMarkcandidate(quants);
        setMarking(true);
    }
    const markingClose = () => {
        setMarking(false);
    }

    useEffect(() => {
        InsuranceApi.getEmployees().then((res) => {
            setEmployees(res.data);
        })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    const getEmpDetails = (id) => {
        InsuranceApi.getEmployeeById(id).then((resp) => {
            setEmployee(resp.data);
            setCandidate(resp.data.assignedCandidates);
        })
            .catch((error) => {
                console.log(error)
            })
    }
    return (
        <div>

            <br/> <br/> <br/> <br/>
            <div className="container dashboard">
                <h4 style={{color:"black"}}>  Employee Dashboard </h4>

                <div>
                    <Form className="container">
                        <Form.Group>
                            <br/>
                            <label style={{color:"black"}}> Select a Employee Name </label>
                            <Form.Select
                                style={{width:200, color:"black", marginTop:10}}
                                value={empid}
                                onChange={(e) => setEmpid(e.target.value) }
                            >
                                <option> Select your option </option>
                                {
                                    employees.map((value, index) => (
                                             <option value={value.id}>  {value.employeeName} </option>
                                    ))
                                }
                            </Form.Select>
                        </Form.Group>
                        <br/>

                        <Button
                            className="btn"
                            style={{backgroundColor:"ghostwhite",  color:"red", width:100}}
                            onClick={() => getEmpDetails(empid)}
                        >
                            Get
                        </Button>
                    </Form>
                </div>


                <br/> <br/>

                <div className="container" style={{backgroundColor:"ghostwhite"}} >

                    <div className="row">
                        <div className="col">
                            <p style={{color:"black"}}> Employee Name :  {employee.employeeName} </p> </div>
                        <div className="col">
                            <p style={{color:"black"}}> Employee ID : {employee.employeeId} </p> </div> </div>
                    <p> </p>

                    <div className="row">
                        <div className="col">
                            <p style={{color:"black"}}> Employee Designation : {employee.employeeDesignation} </p> </div>
                        <div className="col">
                            <p style={{color:"black"}}> Employee E-Mail : {employee.employeeEmail} </p> </div> </div>
                </div>


                <br/>
                <h4 style={{color:"blueviolet"}}> Assigned Candidates  </h4>
                <br/>
                    {
                        <div>
                            {
                        candidate.map((value, index) => (
                            <>
                            <div className="container" style={{backgroundColor:"ghostwhite"}}>
                                <div className="row">
                                <div className="col">
                                    <p style={{color: 'red'}}> Candidate Name :  {value.name}   </p>
                                </div>
                                    <div className="col"/>
                                    <div className="col">
                                        <BsFileEarmarkPlus
                                            style={{cursor:"pointer", color:"blueviolet", marginLeft:300}}
                                            onClick={() => markingOpen(value.quants, value.id, value.name)}
                                        />
                                    </div>
                            </div>
                            <div className="row">
                            <div className="col">
                            <p style={{color:'red'}}> Candidate E-Mail : {value.email}  </p>
                            </div>
                            <div className="col">
                            <p style={{color:'red'}}> Candidate Mobile Number : {value.mobileNumber}  </p>
                            </div>
                            </div>
                                <div className="row">
                                    <div className="col">
                                        <p style={{color:"red"}}> Available Date :  {moment(value.availableDateAndTime).format("DD-MM-YYYY")} </p>
                                    </div>
                                    <div className="col">
                                        <p style={{color:"red"}}> Available Time :  {moment(value.availableDateAndTime).format("HH:mm")} </p>
                                    </div>
                                </div>
                            </div>
                                <br/>
                            </>
                        ))
                            }
                        </div>
                    }
            </div>

            <CandidateMarkingSystem
                open={marking}
                close={() => markingClose()}
                candidate={markcandidate}
                setcandidate={setMarkcandidate}
                markid={markId}
                markname={markName}
            />
        </div>
    );
};

export default EmployeeDashboard;
