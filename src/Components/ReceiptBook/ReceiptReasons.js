import React, {useState} from 'react';
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import Table from "@mui/material/Table";
import InfoIcon from "@mui/icons-material/Info";
import DraggableComponent from "../../Service/DraggableComponent";
import {Modal} from "react-bootstrap";
import "../Css/Content.css";
import TransactionJournalInfo from "../TransactionJournal/TransactionJournalInfo";

const ReceiptReasons = ({value}) => {

    console.log(value)

    const access = JSON.parse(sessionStorage.getItem("specialaccess"))
    const [infoDetails, setInfoDetails] = useState("");
    const [info, setInfo] = useState(false);
    const infoOpen = (value) => {
        setInfoDetails(value)
        setInfo(true)
    }
    const infoClose = () => {
        setInfo(false)
    }




    return (
        <div>
            <div className="container">
                <TableContainer sx={{ maxHeight: 440, maxWidth: 750}}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead className="tableheader">
                            <TableRow className="tablerow">
                                <TableCell className="tblhd" align="left">
                                    ID
                                </TableCell>
                                <TableCell className="tblhd" align="left">
                                    Actions
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                value.map((val, index) => (
                                    <TableRow key={index} className={index % 2 ? "classEven" : "classOdd"}>
                                        <TableCell  align="left">
                                            {val.id}
                                        </TableCell>
                                        <TableCell align="left">
                                            {
                                                access?.find(element => element === "get-transactionjournal") ?
                                                    <InfoIcon
                                                        color="primary"
                                                        style={{cursor: "pointer", marginRight: 10}}
                                                        onClick={() =>infoOpen(val)}
                                                    /> : null
                                            }
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

            <Modal
                dialogAs={DraggableComponent}
                show={info}
                onHide={infoClose}
                centered
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>  Transaction Journal Info </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <TransactionJournalInfo data={infoDetails}/>
                    </div>
                </Modal.Body>
            </Modal>

        </div>
    );
};

export default ReceiptReasons;
