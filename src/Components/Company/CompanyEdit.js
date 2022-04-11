import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import axios from "axios";
import {Box, FormControl, Grid} from "@mui/material";
import moment from "moment";

function CompanyEdit({
  data,
    setData,
    getData,
  handleClickClose,
}) {
  
  let {  companyName,companyCountry, companyLicenseNumber, companyLicenseIssueDate, companyStatus, companyCurrency} = data;

  const editChange = (e) => {
    const { value, name } = e.target;
    setData({ ...data, [name]: value });
  };

  const editChangeDate = (date) => {
    setData({ ...data, companyLicenseIssueDate: date });
  }

  const editFormSubmit = () => {

      const body = {

          companyName : data.companyName,
          companyCountry: data.companyCountry,
          companyLicenseNumber: data.companyLicenseNumber,
          companyLicenseIssueDate: moment(data.companyLicenseIssueDate).format("MM-DD-YYYY"),
          companyStatus:data.companyStatus,
          companyCurrency: data.companyCurrency
      }

      const userid  = sessionStorage.getItem("userid")

    axios
        .patch(`http://localhost:8090/company/${data.companyId}/${userid}`, body, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            }
        })
        .then((resp) => {
          console.log(resp);
          handleClickClose();
          getData();

        });
  };



  console.log(companyLicenseIssueDate,"Date")  
  return (
    <div>
      <form autoComplete="off">
        <Box sx={{flexGrow: 1}}>
          <Grid container spacing={2}>
            <Grid item xs={8} md={6} lg={4}>
                <TextField
             label="Company Name"
                placeholder="Company Name"
                  name="companyName"
                  value={companyName}
                  margin="dense"
             className="formtext"
             fullWidth
                  variant="outlined"
                  onChange={(e) => editChange(e)}
                /> </Grid>

            <Grid item xs={8} md={6} lg={4}>
                <TextField
                placeholder="Company Country"
                label="Company Country"
                  name="companyCountry"
                  value={companyCountry}
                  margin="dense"
                className="formtext"
                fullWidth
                  variant="outlined"
                  onChange={(e) => editChange(e)}
                /></Grid>

            <Grid item xs={8} md={6} lg={4}>
                <TextField
                label="License Number"
                placeholder="License Number"
                  name="companyLicenseNumber"
                  value={companyLicenseNumber}
                  margin="dense"
                className="formtext"
                fullWidth
                  variant="outlined"
                  onChange={(e) => editChange(e)}
                /></Grid>

            <Grid item xs={8} md={6} lg={4}>
                <TextField
                placeholder="Currency"
                label="Currency"
                  name="companyCurrency"
                  value={companyCurrency}
                  margin="dense"
                className="formtext"
                fullWidth
                  variant="outlined"
                  onChange={(e) => editChange(e)}
                /></Grid>



            <Grid item xs={8} md={6} lg={4}>
              <FormControl
                  style={{marginTop: "0.5rem"}}
                  className="formtext"
                  fullWidth
              >
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                      inputFormat="dd-MM-yyyy"
                      label="Date Of License Issued:"
                      className="formtext"
                      id="companyLicenseIssueDate"
                      value={companyLicenseIssueDate}
                      placeholder="Date of License Issued:"
                      name="companyLicenseIssueDate"
                      onChange={(date) => editChangeDate(date)}
                      fullWidth
                      renderInput={(params) => <TextField {...params} />}
                  />

                </LocalizationProvider>
              </FormControl>
            </Grid>

            <Grid item xs={8} md={6} lg={4}>
              <TextField
                placeholder="Status"
                label="Status"
                  name="companyStatus"
                  value={companyStatus}
                  margin="dense"
                  variant="outlined"
                className="formtext"
                fullWidth
                  onChange={(e) => editChange(e)}
              /></Grid>
          </Grid>
        </Box>
          </form>
      <br/>


          <Button
            color="primary"
            variant="contained"
            style={{marginRight:10}}
            onClick={() => editFormSubmit()}
          >
            Submit
          </Button>

        <Button onClick={handleClickClose} color="error" variant="contained">
            Cancel
        </Button>
    </div>
  );
}
  
  export default CompanyEdit;
  