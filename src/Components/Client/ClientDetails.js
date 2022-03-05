import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import AddBoxIcon from "@mui/icons-material/AddBox";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Tooltip from "@mui/material/Tooltip";
import InfoIcon from "@mui/icons-material/Info";
import moment from "moment";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import SearchIcon from "@mui/icons-material/Search";
import "../Css/Content.css";
import "../Css/ContentAdd.css";
import ClientDetailsAdd from "./ClientDetailsAdd";

import {
  TableHead,
  Paper,
  TablePagination,
  Button,
  TextField,
  OutlinedInput,
  InputAdornment,
  makeStyles,
} from "@material-ui/core";
import InsuranceApi from "../../Service/InsuranceApi";
import ClientDetailsEdit from "./ClientDetailsEdit";

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
const initialCheck = {};
const useStyles = makeStyles((theme) => ({
  BackGround: {
    backgroundColor: "#d50000",
    color: "white",
  },
}));

function ClientDetails() {


  useEffect(() => {
    getAllClients();
  }, []);


  const getAllClients = () => {
    InsuranceApi.getAllClients().then((res) => {
      setAllData(res.data);
    })
        .catch((error) => {
          console.log(error);
        })
  }

  let m = moment();
  const classes = useStyles();
  const [allData, setAllData] = useState([]);
  const [open, setOpen] = useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const [editOpen, setEditOpen] = useState(false);
  const [record, setRecord] = useState("");
  const editClickOpen = (item) => {
    InsuranceApi.getClient(item.id).then((res) => {
      setRecord(res.data);
      console.log(res.data)
    })
        .catch((err) => {
          console.log(err)
        })
    setEditOpen(true);
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

  return (
    <div>
      <div className="container">
        <br/>
        <div className="classTitle">
          <h2>
            <b>Client Details Table</b>
          </h2>
        </div>
        <Button>
          <AddBoxIcon
              fontSize="large"
              className={classes.BackGround}
              onClick={handleClickOpen}
          />
        </Button>

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
                    <TableRow
                      className={index % 2 ? "classEven" : "classOdd"}
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
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
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
          <br />

        </Paper>
      </div>

      <div className="footerdescription">
        <h6 className="footerContent">
          Copyright © www.futurainstech.com @{moment().format("YYYY")}
        </h6>
      </div>
      <br />
      <ClientDetailsAdd open={open} handleClose={handleClose} getall={getAllClients} />
      <ClientDetailsEdit open={editOpen} close={editClickClose} data={record} setData={setRecord}  getall={getAllClients} />
    </div>
  );
}
export default ClientDetails;
