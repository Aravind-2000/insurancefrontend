import React, {useState, useEffect} from 'react';
import InsuranceApi from "../../Service/InsuranceApi";
import {Button, Form} from "react-bootstrap";
import moment from "moment";

const EmployeeDashboard = () => {

    const [employees, setEmployees] = useState([]);
    const [employee, setEmployee] = useState(" ");
    const [candidate, setCandidate] = useState([]);
    const [empid, setEmpid] = useState(0);


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
            <div className="container">
                <h4 style={{color:"red"}}>  Employee Dashboard </h4>

                <div>
                    <Form className="container">
                        <Form.Group>
                            <br/>
                            <label style={{color:"red"}}> Select a Employee Name </label>
                            <Form.Select
                                style={{width:170, color:"red"}}
                                value={empid}
                                onChange={(e) => setEmpid(e.target.value) }
                            >
                                <option> Select a Option </option>
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
                            <p style={{color:"red"}}> Employee Name :  {employee.employeeName} </p> </div>
                        <div className="col">
                            <p style={{color:"red"}}> Employee ID : {employee.employeeId} </p> </div> </div>
                    <p> </p>

                    <div className="row">
                        <div className="col">
                            <p style={{color:"red"}}> Employee Designation : {employee.employeeDesignation} </p> </div>
                        <div className="col">
                            <p style={{color:"red"}}> Employee E-Mail : {employee.employeeEmail} </p> </div> </div>
                </div>


                <br/>
                <h4 style={{color:"red"}}> Assigned Candidates </h4>
                <br/>
                    {
                        <div>
                            {
                        candidate.map((value, index) => (
                            <>
                            <div className="container" style={{backgroundColor:"ghostwhite"}}>
                                <div className="row">
                                <div className="col">
                                    <p style={{color: 'red'}}> Candidate Name : {value.name}  </p>
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

        </div>
    );
};

export default EmployeeDashboard;
