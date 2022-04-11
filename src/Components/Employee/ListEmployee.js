import React, {useEffect, useState} from 'react';
import InsuranceApi from "../../Service/InsuranceApi";
import {Modal, Table} from "react-bootstrap";
import {MdOutlineViewInAr} from "react-icons/md";
import {makeStyles, TablePagination} from "@material-ui/core";
import AddBoxIcon from "@mui/icons-material/AddBox";
import {Button} from "@mui/material";




const useStyles = makeStyles((theme) => ({
    BackGround: {
        backgroundColor: "#d50000",
        color: "white",
    },
}));
const ListEmployee = () => {

    const access = JSON.parse(sessionStorage.getItem("specialaccess"))

    const classes = useStyles();
    const [employees, setEmployees] = useState([]);
    const [candidates, setAssignedcandidates] = useState([]);
    const [record, setRecord] = useState("");

    const [empmodal, setEmpmodal] = useState(false);
    const showempmodal = (id) => {
        if(access.find(element => element === "get-employee")){
            InsuranceApi.getEmployeeById(id).then((resp) => {
                setRecord(resp.data)
                setAssignedcandidates(resp.data.assignedCandidates);
            })
                .catch((error) => {
                    console.log(error);
                });
            setEmpmodal(true);
        }
        else{
            window.alert("UNAUTHORIZED")
        }
    }
    const hideempmodal = () => setEmpmodal(false);

    //Pagination
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    useEffect(() => {
        getAllEmployee();
    }, []);

    const getAllEmployee = () => {
        InsuranceApi.getEmployees().then((res) => {
            setEmployees(res.data);

        })
            .catch((error) => {
                console.log(error);
            })
    }


    return (
        <div>
            <div className="container" >
                <div className="classTitle">
                    <h2> <b> Employee Details </b> </h2>
                </div>
                <br/>
                <Button>
                    <AddBoxIcon
                        fontSize="large"
                        className={classes.BackGround}
                    />
                </Button>
                <br /> <br />
                <div className="card card-lg p-3 mb-5 bg-body rounded">
                    <div className="card-body">
                        <Table  striped bordered>
                            <thead className="tableheader">
                            <tr className="tablerow">
                                <td className="tblhd" align="left"> Employee Name </td>
                                <td className="tblhd" align="left"> Employee ID </td>
                                <td className="tblhd" align="left"> Assigned Candidates </td>
                            </tr>
                            </thead>

                            <tbody>
                            {
                                employees
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((value, index) => (
                                    <tr key={index} className={index % 2 ? "classEven" : "classOdd"}>
                                        <td> {value.employeeName}</td>
                                        <td> {value.employeeId} </td>
                                        <td>
                                            <MdOutlineViewInAr
                                                onClick={() => showempmodal(value.id)}
                                                style={{cursor:"pointer"}}
                                            />
                                        </td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </Table>
                        <TablePagination
                            className="contentPagination"
                            rowsPerPageOptions={[5, 10, 25, 50, 100]}
                            component="div"
                            count={employees.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    </div>
                </div>
            </div>

            <Modal
                show={empmodal}
                onHide={hideempmodal}
                centered
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
            >
                <Modal.Header closeButton>
                    <Modal.Title > Employee Details</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <h6> Employee Name : {record.employeeName} </h6>
                    <h6> Employee Name : {record.employeeId} </h6>
                    <h6> Employee Name : {record.employeeEmail} </h6>
                    <h6> Employee Name : {record.employeeDesignation} </h6>

                    <h4> Assigned Candidates </h4>
                    <Table striped bordered>
                        <thead>
                        <tr>
                            <td> Name </td>
                            <td> Mobile Number </td>
                            <td> E-Mail </td>
                            <td> Highest Qualification </td>
                            <td> Communication Mode </td>
                            <td> Current Status of Candidate </td>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            candidates.map((value, index) => (
                                <tr key={index}>
                                    <td> {value.name}</td>
                                    <td> {value.mobileNumber} </td>
                                    <td> {value.email} </td>
                                    <td> {value.highestQualification} </td>
                                    <td> {value.communication} </td>
                                    <td> {value.currentStatus} </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </Table>


                </Modal.Body>

            </Modal>

        </div>
    );
};

export default ListEmployee;
