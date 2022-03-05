import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./BankAccount.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Button } from "@mui/material";
import BankAccountAdd from "./BankAccountAdd";
import BankAccountEdit from "./BankAccountEdit";
import BankAccountInfo from "./BankAccountInfo";
import InfoIcon from '@mui/icons-material/Info';
import ClientDetailsAdd from "../Client/ClientDetailsAdd";

var initialValues = {
  id: "",
  accountHolderName: "",
  accountNumber: "",
  bankName: "",
  ifscCode: "",
  bankBranch: "",
  isActive: ""
};

function BankAccount() {
  const [bankAccountData, setBankAccountData] = useState(initialValues);
  const [data, setData] = useState([]);
  const [record, setRecord] = useState("");
  const [info, setInfo] = useState("");

  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const[infoOpen, setInfoOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickClose = () => {
    setOpen(false);
  };
  const editClickOpen = (item) => {
    setRecord(item);
    setEditOpen(true);
  };
  const editClickClose = () => {
    setEditOpen(false);
  };
  const infoClickOpen = (item) => {
    setInfo(item);
    setInfoOpen(true);
  };
  const infoClickClose = () => {
    setInfoOpen(false);
  };


  const handleChange = (e) => {
    const { value, name } = e.target;
    setBankAccountData({ ...bankAccountData, [name]: value });
  };
  const editChange = (e) => {
    const { value, name } = e.target;
    setRecord({ ...record, [name]: value });
  };

  // const infoChange = (e) => {
  //   const { value, name } = e.target;
  //   setRecord({ ...record, [name]: value });
  // };
  const handleFormSubmit = () => {
    axios
      .post(`http://localhost:8090/bank/add`, bankAccountData)
      .then((resp) => {
        console.log(resp);
        
        handleClickClose();
        getdata();
        setBankAccountData(initialValues);
      });
  };

  const editFormSubmit = () => {
    axios
      .patch(`http://localhost:8090/bank/${record.id}`, record)
      .then((resp) => {
        console.log(resp);
        editClickClose();
        getdata();
      });
  };
  //Delete
  const handleDelete = (oldData) => {

    const confirm = window.confirm(
      "Are you sure, you want to delete this row",
      oldData
    );
    if (confirm) {
      
      axios.patch(`http://localhost:8090/bank/delete/${oldData}`).then((resp) => {
      console.log(resp);
      getdata();
    });
    }
    
  };

  const getdata = () => {
    axios
        .get(`http://localhost:8090/bank/getall`)
        .then((resp) => {
        console.log(resp);
        setData(resp.data);
        })
        .catch((err) => console.log(err));

    };

  
  useEffect(() => {
    getdata();
  }, []);
  
  return (
    <div>

      <Paper className="paperDesign" elevation={12}>
        <Button color="primary" variant="contained" onClick={handleClickOpen}>
          <AddBoxIcon />
        </Button>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead className="tableHeader">
              <TableRow> 
                <TableCell>Id</TableCell>
                <TableCell>BankAccount-Name</TableCell>
                <TableCell>BankAccount-No</TableCell>
                <TableCell>Bank-Name</TableCell>
                <TableCell>IFCS-Code</TableCell>
                <TableCell>Bank-Branch</TableCell>   
                {/* <TableCell>IS-Active</TableCell>
                <TableCell>Created-Date</TableCell>
                <TableCell>Modified-Date</TableCell>  */}
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((value, index) => (
                <TableRow>
                  <TableCell>{value.id}</TableCell>
                  <TableCell>{value.accountHolderName}</TableCell>
                  <TableCell>{value.accountNumber}</TableCell>
                  <TableCell>{value.bankName}</TableCell>
                  <TableCell>{value.ifscCode}</TableCell>
                  <TableCell>{value.bankBranch}</TableCell>
                  {/* <TableCell>{value.is_active}</TableCell>
                  <TableCell>{value.created_date}</TableCell>
                  <TableCell>{value.modified_date}</TableCell> */}
                  <TableCell>
                    <div style={{ display: "flex" }}>
                      <EditIcon
                        color="primary"
                        onClick={() => editClickOpen(value)}
                      />
                      <DeleteIcon
                        color="error"
                        onClick={() => handleDelete(value.id)}
                      />
                      <InfoIcon
                        
                        onClick={() => infoClickOpen(value)}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <BankAccountAdd
        open={open}
        handleClickClose={handleClickClose}
        data={bankAccountData}
        onChange={handleChange}
        handleFormSubmit={() => handleFormSubmit()}
      />
      <BankAccountEdit
        open={editOpen}
        handleClickClose={editClickClose}
        data={record}
        onChange={editChange}
        handleFormSubmit={() => editFormSubmit()}
      />
      <BankAccountInfo
        open={infoOpen}
        handleClickClose={infoClickClose}
        data={info}
      />
      <ClientDetailsAdd
          bankopen={handleClickOpen}
          bankClose={handleClickClose}
      />
    </div>
  );
}

export default BankAccount;



