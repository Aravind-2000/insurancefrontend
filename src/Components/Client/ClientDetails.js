import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import AddBoxIcon from "@mui/icons-material/AddBox";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import moment from "moment";
import "../Css/Content.css";
import "../Css/ContentAdd.css";
import ClientDetailsAdd from "./ClientDetailsAdd";

import {
  TableHead,
  Paper,
  TablePagination,
  Button,
  makeStyles,
} from "@material-ui/core";
import InsuranceApi from "../../Service/InsuranceApi";
import ClientDetailsEdit from "./ClientDetailsEdit";
import ProofsAdd from "../Proofs/ProofsAdd";
import {Modal} from "react-bootstrap";

// const initialPValue = {
//   id: "",
//   surName:"",
//   givenName:"",
//   saluation:"",
//   gender:"",
//   marritalStatus:"",
//   addressid:"",
//
// };
const useStyles = makeStyles((theme) => ({
  BackGround: {
    backgroundColor: "#d50000",
    color: "white",
  },
}));

function ClientDetails() {


const access = JSON.parse(sessionStorage.getItem("specialaccess"))


  const getAllClients = () => {
    InsuranceApi.getAllClients(sessionStorage.getItem("userid")).then((res) => {
      setAllData(res.data);
    })
        .catch((error) => {
          console.log(error);
        })
  }
  const classes = useStyles();
  const [allData, setAllData] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getAllClients();
  }, []);

  const handleClickOpen = () => {
    if(access.find(element => element === "add-client")){
      setOpen(true);
    }
    else{
      window.alert("UNAUTHORIZED")
    }

  };

  const handleClose = () => {
    setOpen(false);
  };


  const [editOpen, setEditOpen] = useState(false);
  const [record, setRecord] = useState("");
  const editClickOpen = (item) => {
    if(access.find(element => element === "update-client")){
      setRecord(item);
      setEditOpen(true);
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

  const [search, setSearch] = useState("");
  const globalsearch = (val) =>{
    val === "" ? getAllClients() : axios.get(`http://localhost:8090/client/search/${val}`,{
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      }
    }).then((res) => {
      setAllData(res.data);
    })
        .catch((err) => {
          console.log(err)
        })

  }

  const deleteClient = (id) => {
    const userid  = sessionStorage.getItem("userid")
    axios.patch(`http://localhost:8090/client/del/${id}/${userid}`, {},{
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      }
    }).then((res) => {
      if(res.data === "UNAUTHORIZED"){
        window.alert(res.data)
      }
      getAllClients();
    })
        .catch((err) => {
          console.log(err)
        })
  }

  //For Proofs
  const [clientID, setClientID] = useState("");
  const [proofList, setProofList] = useState([]);
  const [proofsModal, setProofsModal] = useState(false);


  const handleproofopen = (id, prooflist) => {
    if(access.find(element => element === "get-all-active-proof")){
      setClientID(id);
      setProofList(prooflist);
      setProofsModal(true);
    }
   else{
     window.alert("UNAUTHORIZED")
    }
  }
  const handleproofclose = () => {
    setProofsModal(false);
  }



  return (
    <div>
      <div className="container">
        <div className="classTitle">
          <h2>
            <b>Client Details</b>
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
        <input type="search" placeholder="search" value={search} onChange={(e) => {setSearch(e.target.value); globalsearch(e.target.value)}} />
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
                  <TableCell className="tblhd" align="left">
                    Name
                  </TableCell>
                  <TableCell className="tblhd" align="left">
                   Salutation
                  </TableCell>
                  <TableCell className="tblhd" align="left">
                    Gender
                  </TableCell>
                  <TableCell className="tblhd" align="left">
                    Marrital Status
                  </TableCell>
                  <TableCell className="tblhd" align="left">
                    Nationality
                  </TableCell>
                  <TableCell className="tblhd" align="left">
                    Language
                  </TableCell>
                  <TableCell className="tblhd" align="left">
                    Mobile Number
                  </TableCell>
                  <TableCell className="tblhd" align="left">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((value, index) => (
                    <TableRow className={index % 2 ? "classEven" : "classOdd"}
                      key={index}
                    >
                      <TableCell align="left">{value.givenName} {value.surName}</TableCell>
                      <TableCell align="left">{value.salutation}</TableCell>
                      <TableCell align="left">{value.gender}</TableCell>
                      <TableCell align="left">{value.marritalStatus}</TableCell>
                      <TableCell align="left">{value.nationality}</TableCell>
                      <TableCell align="left">{value.language}</TableCell>
                      <TableCell align="left">{value.mobileNumber}</TableCell>

                      <TableCell align="left">
                        <div className="TableClass">
                          <EditIcon
                            color="primary"
                            style={{cursor:"pointer", marginRight:10}}
                            onClick={() => editClickOpen(value)}
                          />
                          <DeleteIcon
                              style={{cursor:"pointer"}}
                            className="deleteClass"
                            color="error"
                              onClick={() => deleteClient(value.id)}
                          />
                          <LibraryBooksIcon
                              style={{cursor:"pointer", marginLeft:5}}
                              color="primary"
                              onClick={() => handleproofopen(value.id, value.proofList)}
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

        </Paper>
      </div>

      <div className="footerdescription">
        <h6 className="footerContent">
          Copyright © www.futurainstech.com @{moment().format("YYYY")}
        </h6>
      </div>
      <br />


      <Modal
          show={open}
          onHide={handleClose}
          size="xl"
          centered
      >
        <Modal.Header closeButton> <Modal.Title> <h4>  Client Details </h4> </Modal.Title> </Modal.Header>
        <Modal.Body>
          <div className="container">
            <ClientDetailsAdd handleClose={handleClose} open={open} getall={getAllClients} /> </div>
          </Modal.Body>
      </Modal>
      <ClientDetailsEdit open={editOpen} close={editClickClose} data={record} setData={setRecord}  getall={getAllClients} />

      <Modal
          show={proofsModal}
          onHide={handleproofclose}
          size="lg"
          centered
      >
        <Modal.Header closeButton><Modal.Title> <h4>  Proofs </h4> </Modal.Title> </Modal.Header>

        <Modal.Body>
          <ProofsAdd clientid={clientID} getall={getAllClients}  close={handleproofclose} proofs={proofList} setproofs={setProofList}/>
        </Modal.Body>

      </Modal>
    </div>
  );
}
export default ClientDetails;
