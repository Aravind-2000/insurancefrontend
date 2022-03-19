import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddBoxIcon from "@mui/icons-material/AddBox";
import {Button, Dialog, DialogContent} from "@mui/material";
import BankAccountAdd from "./BankAccountAdd";
import BankAccountEdit from "./BankAccountEdit";
import BankAccountInfo from "./BankAccountInfo";
import InfoIcon from '@mui/icons-material/Info';
import "../Css/Content.css"
import {makeStyles, TablePagination} from "@material-ui/core";
import moment from "moment";



const useStyles = makeStyles((theme) => ({
    BackGround: {
        backgroundColor: "#d50000",
        color: "white",
    },
}));
function BankAccount() {



    const classes = useStyles();

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


  const editChange = (e) => {
    const { value, name } = e.target;
    setRecord({ ...record, [name]: value });
  };

  // const infoChange = (e) => {
  //   const { value, name } = e.target;
  //   setRecord({ ...record, [name]: value });
  // };

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

  const [search, setSearch] = useState("");

  const globalsearch = (val) => {
    val === "" ? getdata() : axios.get(`http://localhost:8090/bank/search/${val}`).then((res) => {
      setData(res.data)
    })
        .catch((err) => {
          console.log(err)
        })
  }

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

  return (
    <div>
        <div className="container">
      <div className="classTitle">
        <h2>
          <b>Bank Account Details</b>
        </h2>
      </div>
        <br/>
        <Button>
            <AddBoxIcon
                fontSize="large"
                className={classes.BackGround}
                onClick={handleClickOpen}
            />
        </Button>
        <input type="search" placeholder="search" style={{marginLeft:10}} value={search} onChange={(e) => {setSearch(e.target.value); globalsearch(e.target.value)}} />
      <br/>

      <Paper className="paperStyle" >
        <TableContainer sx={{ maxHeight: 440, maxWidth: 1200, marginLeft:5 }}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead className="tableheader">
              <TableRow className="tablerow">
                {/*<TableCell className="tblhd" align="left">Id</TableCell>*/}
                <TableCell className="tblhd" align="left"> Account Holder Name</TableCell>
                <TableCell className="tblhd" align="left">Account Number</TableCell>
                <TableCell className="tblhd" align="left">Bank Name</TableCell>
                <TableCell className="tblhd" align="left">IFSC Code</TableCell>
                <TableCell className="tblhd" align="left">Bank Branch</TableCell>
                {/* <TableCell>IS-Active</TableCell>
                <TableCell>Created-Date</TableCell>
                <TableCell>Modified-Date</TableCell>  */}
                <TableCell className="tblhd" align="left">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((value, index) => (
                <TableRow className={index % 2 ? "classEven" : "classOdd"}
                    key={index}
                >
                  {/*<TableCell  align="left">{value.id}</TableCell>*/}
                  <TableCell  align="left">{value.accountHolderName}</TableCell>
                  <TableCell  align="left">{value.accountNumber}</TableCell>
                  <TableCell  align="left">{value.bankName}</TableCell>
                  <TableCell  align="left">{value.ifscCode}</TableCell>
                  <TableCell  align="left">{value.bankBranch}</TableCell>
                  {/* <TableCell>{value.is_active}</TableCell>
                  <TableCell>{value.created_date}</TableCell>
                  <TableCell>{value.modified_date}</TableCell> */}
                  <TableCell  align="left">
                    <div className="TableClass">
                      <EditIcon
                        color="primary"
                        style={{cursor:"pointer", marginRight:10}}
                        onClick={() => editClickOpen(value)}
                      />
                      <DeleteIcon
                        color="error"
                        style={{cursor:"pointer", marginRight:10}}
                        onClick={() => handleDelete(value.id)}
                      />
                      <InfoIcon
                          className="deleteClass"
                          style={{cursor:"pointer", marginRight:10}}
                        onClick={() => infoClickOpen(value)}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
            <br/>
            <TablePagination
                className="contentPagination"
                rowsPerPageOptions={[5, 10, 25, 50, 100]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </TableContainer>
          <br/>
      </Paper>
        </div>
        <div className="footerdescription">
            <h6 className="footerContent">
                Copyright © www.futurainstech.com @{moment().format("YYYY")}
            </h6>
        </div>
        <br />


        <Dialog
            open={open}
            onClose={handleClickClose}
            maxWidth="lg"
        >
            <>
                <h4 style={{backgroundColor:"Black", color:"White", textAlign:"center"}}>  Account Add  </h4>
                <DialogContent>
                    <BankAccountAdd
                        handleClickClose={handleClickClose}
                    />
                </DialogContent>
            </>
        </Dialog>


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
    </div>
  );
}

export default BankAccount;



