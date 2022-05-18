import React,{useState} from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import moment from "moment";
import axios from "axios";
import {Box, FormControl, Grid, MenuItem} from "@mui/material";



function CompanyAdd({
    open,
    handleClickClose, close,
    getdata,status
  }
  
  )
  
   {


       const [companyName, setCompanyName] = useState(" ");
       const [companyCountry, setCompanyCountry] = useState("");
       const [companyLicenseNumber, setCompanyLicenseNumber] = useState("");
       const [companyStatus, setCompanyStatus] = useState(" ");
       const [companyCurrency, setCompanyCurrency] = useState(" ");
       const [companylicenseDate, setCompanylicenseDate] = useState(" ");

       const handleFormSubmit = () => {
           const companyLicenseIssueDate = moment(companylicenseDate).format("MM-DD-YYYY")
            let data = {  companyName,companyCountry, companyLicenseNumber, companyLicenseIssueDate, companyStatus, companyCurrency} ;


      axios
        .post(`http://localhost:8090/company/add/` + sessionStorage.getItem("userid"), data , {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            }
        })
        .then((resp) => {
          console.log(resp);
          if(open === true){
              handleClickClose();
              getdata();
          }
          close();

        });
    };


    return (
      <div>
          <form autoComplete="off">
              <Box sx={{flexGrow: 1}}>
                  <Grid container spacing={2}>
                      <Grid item xs={8} md={6} lg={4}>
                  <TextField

                        name="companyName"
                        label="Company Name"
                        margin="dense"
                      className="formtext"
                      fullWidth
                        variant="outlined"
                        placeholder="Company Name"
                        onChange={(e) => setCompanyName(e.target.value)}
                  /> </Grid>

                      <Grid item xs={8} md={6} lg={4}>
                  <TextField
                  style={{marginLeft:"2rem"}}
                  placeholder="Country"
                    name="companyCountry"
                    label="Country"
                  className="formtext"
                  fullWidth
                    margin="dense"
                    variant="outlined"
                    onChange={(e) => setCompanyCountry(e.target.value)}
                  /> </Grid>

                      <Grid item xs={8} md={6} lg={4}>
                  <TextField
                  placeholder="License Number"
                    name="companyLicenseNumber"
                    label="License Number"
                    margin="dense"
                  className="formtext"
                  fullWidth
                    variant="outlined"
                    onChange={(e) => setCompanyLicenseNumber(e.target.value)}
                  /></Grid>

                      <Grid item xs={8} md={6} lg={4}>
                  <TextField
                  placeholder="Currency"
                    name="companyCurrency"
                    label="Currency"
                    margin="dense"
                  className="formtext"
                  fullWidth
                    variant="outlined"
                    onChange={(e) => setCompanyCurrency(e.target.value)}
                  /></Grid>



                      <Grid item xs={8} md={6} lg={4}>
                  <TextField
                      select
                    style={{marginRight:"2rem"}}
                  placeholder="Status"
                    name="companyStatus"
                    label="Status"
                    margin="dense"
                    className="formtext"
                    fullWidth
                    variant="outlined"
                    onChange={(e) => setCompanyStatus((e.target.value))}
                  >
                      {
                          status.map((val) => (
                              <MenuItem value={val}> {val.toUpperCase()} </MenuItem>
                          ))
                      }
                  </TextField>

                      </Grid>


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
                        value={companylicenseDate}
                        placeholder="Date of License Issued:"
                        name="companyLicenseIssueDate"
                        onChange={(date) => setCompanylicenseDate(date)}
                        fullWidth
                        renderInput={(params) => <TextField {...params} />}
                      />

                </LocalizationProvider>
                          </FormControl>
                          </Grid>
                  </Grid>
              </Box>

            </form>
          <br/>


            <Button
              color="primary"
              variant="contained"
              style={{marginRight:10}}
              onClick={() => handleFormSubmit()}
            >
              Submit
            </Button>

          {
           open === true ? <Button onClick={handleClickClose}  color="error" variant="contained">
               Cancel
           </Button> : null
          }
      </div>
    );
  }
  
  export default CompanyAdd;
  