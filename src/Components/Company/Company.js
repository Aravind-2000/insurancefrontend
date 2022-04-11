import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import AddBoxIcon from "@mui/icons-material/AddBox";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import CompanyAdd from "./CompanyAdd";
import CompanyEdit from "./CompanyEdit";
import {makeStyles, TablePagination} from "@material-ui/core";
import {Modal} from "react-bootstrap";
import Paper from "@mui/material/Paper";
import moment from "moment";




const useStyles = makeStyles((theme) => ({
  BackGround: {
    backgroundColor: "#d50000",
    color: "white",
  },
}));

function Company() {

  const access = JSON.parse(sessionStorage.getItem("specialaccess"));

  const classes = useStyles();
  const [data, setData] = useState([]);
  const [editCompany, seteditCompany] = useState("");
  const [info, setInfo] = useState("");
  
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const[infoOpen, setInfoOpen] = useState(false);





  const handleClickOpen = () => {
    if(access.find(element => element === "add-company")){
      setOpen(true);
    }
    else{
      window.alert("UNAUTHORIZED")
    }
  };
  const handleClickClose = () => {
    setOpen(false);
  };


  const editClickOpen = (item) => {
    if(access.find(element => element === "update-company")){
      seteditCompany(item);
      setEditOpen(true);
    }
    else{
      window.alert("UNAUTHORIZED")
    }
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


  //Delete
  const handleDelete = (oldData) => {

    const userid = sessionStorage.getItem("userid")
    if(access.find(element => element === "soft-delete-company")){
      const confirm = window.confirm(
          "Are you sure, you want to delete this row",
          oldData
      );
      if (confirm) {
        axios.patch(`http://localhost:8090/company/delete/${oldData}/${userid}`, {}, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          }
        }).then((resp) => {
          console.log(resp);
          getData();
        });
      }
    }
    else{
      window.alert("UNAUTHORIZED")
    }
  };

  const getData = () => {
    axios
        .get(`http://localhost:8090/company/getall/` + sessionStorage.getItem("userid"), {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          }
        })
        .then((resp) => {
        setData(resp.data);
        })
        .catch((err) => console.log(err));

    };

  
  useEffect(() => {
    getData();
  }, []);
  
  return (
      <div>
    <div className="container">
      <div className="classTitle">
        <h2> <b> Company Details </b> </h2>
      </div>
      <br/>
      <Button>
        <AddBoxIcon
            fontSize="large"
            className={classes.BackGround}
            onClick={handleClickOpen}
        />
      </Button>

      <Paper className="paperStyle">
        <TableContainer sx={{ maxHeight: 440, maxWidth: 1200, marginLeft:5 }}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead className="tableheader">
              <TableRow className="tablerow">
                <TableCell className="tblhd" align="left">Company Name </TableCell>
                <TableCell className="tblhd" align="left">Company Country</TableCell>
                <TableCell className="tblhd" align="left">Company Status</TableCell>
                <TableCell className="tblhd" align="left">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((value, index) => (
                <TableRow key={index} className={index % 2 ? "classEven" : "classOdd"}>
                  <TableCell align="left">{value.companyName}</TableCell>
                  <TableCell align="left">{value.companyCountry}</TableCell>
                  <TableCell align="left">{value.companyStatus}</TableCell>
                  <TableCell align="left">
                    <div style={{ display: "flex" }}>
                      <EditIcon
                        color="primary"
                        style={{cursor:"pointer"}}
                        onClick={() => editClickOpen(value)}
                      />
                      <DeleteIcon
                        color="error"
                        style={{cursor:"pointer"}}
                        onClick={() => handleDelete(value.companyId)}
                      />
                      {/*<InfoIcon*/}
                      {/*  */}
                      {/*  onClick={() => infoClickOpen(value)}*/}
                      {/*/>*/}
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

      <Modal
          show={open}
          onHide={handleClickClose}
          centered
          size="xl"
      >
        <Modal.Header closeButton>
          <Modal.Title> Add Company </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="container">
            <CompanyAdd
                open={open}
                handleClickClose={handleClickClose}
                getdata={getData}
            />
          </div>
        </Modal.Body>

      </Modal>

      <Modal
          show={editOpen}
          onHide={editClickClose}
          centered
          size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title> Add Company </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="container">
            <CompanyEdit
                open={editOpen}
                handleClickClose={editClickClose}
                data={editCompany}
                getData = {getData}
                setData = {seteditCompany}
            />
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Company;



