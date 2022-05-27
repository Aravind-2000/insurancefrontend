import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import AddBoxIcon from "@mui/icons-material/AddBox";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import moment from "moment";
import "../Css/Content.css"
import "../Css/ContentAdd.css"
import ClientAddressAdd from "./ClientAddressAdd";

import {
  TableHead,
  Paper,
  TablePagination,
  Button,
  makeStyles,
} from "@material-ui/core";
import InsuranceApi from "../../Service/InsuranceApi";
import ClientAddressEdit from "./ClientAddressEdit";
import {Dialog, DialogContent, InputAdornment, TextField} from "@mui/material";


const useStyles = makeStyles((theme) => ({
  BackGround: {
    backgroundColor: "#d50000",
    color: "white",
  },
}));


function ClientAddress() {

  const access = JSON.parse(sessionStorage.getItem("specialaccess"))

  useEffect(() => {
    getAllAddress();
  }, []);


  const getAllAddress = () => {
    InsuranceApi.getAllAddress(sessionStorage.getItem("userid")).then((res) => {
      setAllData(res.data);
      console.log(allData);
    })
        .catch((error) => {
          console.log(error);
        } )
  }


  const classes = useStyles();
  const [allData, setAllData] = useState([]);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    if(access.find(element => element === "add-address")){
      setOpen(true);
    }
    else{
      window.alert("UNAUTHORIZED")
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [record, setRecord] = useState("");
  const [editOpen, setEditOpen] = useState(false);


  const editClickOpen = (item) => {
    if(access.find(element => element ==="update-address")){
      setEditOpen(true);
      setRecord(item);
    }
    else{
      window.alert("UNAUTHORIZED")
    }
  }

  const editClickClose = () => {
    setEditOpen(false);
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

  //   const [q, setQ] = useState("");
  //   const [searchColumns, setSearchColumns] = useState(["id"]);
  //   function search(rows) {
  //     return rows.filter((row) =>
  //       searchColumns.some(
  //         (column) =>
  //           row[column]
  //             ?.toString()
  //             .toLowerCase()
  //             .indexOf(q.toLowerCase()) > -1
  //       )
  //     );
  //   }


  const deleteAddress = (id) => {
    const userid = sessionStorage.getItem("userid")
    axios.patch(`http://localhost:8090/address/delete/${id}/${userid}`, {}, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      }
    }).then((res) => {
      if(res.data === "UNAUTHORIZED"){
        window.alert(res.data)
      }
      console.log(res.data);
      getAllAddress();
    })
        .catch((err) => {
          console.log(err);
        })
  }

  const [search, setSearch] = useState("");

  const globalsearch = (val) => {
    val === "" ? getAllAddress() : axios.get(`http://localhost:8090/address/search/${val}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      }
    }).then((res) => {
      setAllData(res.data)
    })
        .catch((err) => {
          console.log(err)
        })
  }

  return (
    <div>
      <div className="container">
        <div className="classTitle">
          <h2>
            <b>Client Address</b>
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
        {/*<input type="search" placeholder="search" value={search} onChange={(e) => {setSearch(e.target.value); globalsearch(e.target.value)}} />*/}
        <TextField
            type="text"
            label="Search"
            value={search}
            onChange={(e) => {setSearch(e.target.value); globalsearch(e.target.value)}}
            InputProps={{
              endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon/>
                  </InputAdornment>
              )
            }
            }
            fullwidth
        />
        <div className="mainClass">
          {/* <OutlinedInput
            className="outlinedInput"
            type="text"
            label="Search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            }
            fullwidth
          /> */}
          <div className="innerClass">
            {/*<Button*/}
            {/*  className={classes.BackGround}*/}
            {/*  color="primary"*/}
            {/*  variant="contained"*/}
            {/*  onClick={clickHandler}*/}
            {/*>*/}
            {/*  <InsertDriveFileIcon />*/}
            {/*</Button>*/}
          </div>
        </div>

        <Paper className="paperStyle">
          <TableContainer sx={{ maxHeight: 440, maxWidth: 1200, marginLeft:5 }}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead className="tableheader">
                <TableRow className="tablerow">
                  {/*<TableCell className="tblhd" align="left">*/}
                  {/*  Address Id*/}
                  {/*</TableCell>*/}
                  <TableCell className="tblhd" align="left">
                    To Address
                  </TableCell>
                  <TableCell className="tblhd" align="justify">
                    Address Line
                  </TableCell>
                  <TableCell className="tblhd" align="left">
                    City
                  </TableCell>
                  <TableCell className="tblhd" align="left">
                    State
                  </TableCell>
                  <TableCell className="tblhd" align="left">
                    Country
                  </TableCell>
                  <TableCell className="tblhd" align="left">
                    Pincode
                  </TableCell>
                  <TableCell className="tblhd" align="left">
                    Address Type
                  </TableCell>
                  {/*<TableCell className="tblhd" align="left">*/}
                  {/*  Is Active*/}
                  {/*</TableCell>*/}

                  <TableCell className="tblhd" align="left">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((value, index) => (
                    <TableRow
                        className={index % 2 ? "classEven" : "classOdd"}
                      key={index}
                    >
                      {/*<TableCell align="left">{value.id}</TableCell>*/}
                      <TableCell align="left">{value.toAddress}</TableCell>
                      <TableCell align="left">{value.addressLine1} {value.addressLine2}</TableCell>
                      <TableCell align="left">{value.city}</TableCell>
                      <TableCell align="left">{value.state}</TableCell>
                      <TableCell align="left">{value.country}</TableCell>
                      <TableCell align="left">{value.pincode}</TableCell>
                      <TableCell align="left">{value.addressType}</TableCell>
                      {/*<TableCell align="left">{value.isPresentAddress}</TableCell>*/}

                      <TableCell align="left">
                        <div className="TableClass">
                          <EditIcon
                            color="primary"
                            style={{cursor:"pointer", marginRight:10}}
                            onClick={() => editClickOpen(value)}
                          />
                          <DeleteIcon
                            className="deleteClass"
                            color="error"
                            style={{cursor:"pointer"}}
                            onClick={(e) => deleteAddress(value.id) }
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
                count={allData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </TableContainer>

          <br />


          <Dialog
              open={open}
              onClose={handleClose}
              maxWidth="lg"
          >
            <>
              <h4 style={{backgroundColor:"Black", color:"White", textAlign:"center"}}>  Client Address Add </h4>
              <DialogContent>
                <ClientAddressAdd/>
                <br/>
                <Button
                    color="error"
                    variant="contained"
                    onClick={() => handleClose()}> Cancel </Button>
              </DialogContent>
            </>
          </Dialog>


          <ClientAddressEdit open={editOpen} close={editClickClose} data={record} setData={setRecord} getall={getAllAddress} />
        </Paper>
      </div>

      <div className="footerdescription">
        <h6 className="footerContent">
          Copyright © www.futurainstech.com @{moment().format("YYYY")}
        </h6>
      </div>
      <br />

    </div>
  );
}
export default ClientAddress;
