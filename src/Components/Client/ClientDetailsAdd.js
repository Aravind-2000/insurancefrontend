import React, {useState, useEffect} from "react";
import Button from "@mui/material/Button";
import {
  TextField,
  FormControl,
  Grid,
  Box,
} from "@mui/material";
import axios from "axios";
import { Checkbox, MenuItem } from "@material-ui/core";
import FormControlLabel from "@mui/material/FormControlLabel";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import "../Css/Content.css"
import InsuranceApi from "../../Service/InsuranceApi";
import moment from "moment";
import ClientDetailsEdit from "./ClientDetailsEdit";
import ClientAddressAdd from "../Address/ClientAddressAdd";
import BankAccountAdd from "../BankAccount/BankAccountAdd";
import {Modal} from "react-bootstrap";

function ClientDetailsAdd({ clientclose, modal,  handleClose, open , getall }) {


  const [address, setAddress] = useState([]);
    const [bankAccount, setBankAccount] = useState([]);
    const [gender1, setGender1] = useState([]);
    const [gender2, setGender2] = useState([]);
    const [relationship, setRelationship] = useState([]);
  const [work, setWork] = useState([]);

  useEffect(() => {
         getAddress();
         getBankAccounts();
         getGender();
         getSalution();
         marriage();
         working();
      }, []);


    const working = () => {
      InsuranceApi.getParameterRule("W0001").then((res) => {
        setWork(res.data);
      })
          .catch((err) => {
            console.log(err)
          })
    }

    const marriage = () => {
      InsuranceApi.getParameterRule("R0001").then((res) => {
        setRelationship(res.data);
      })
          .catch((err) => {
            console.log(err)
          })
    }

    const getGender = () => {
      InsuranceApi.getParameterRule("G0001").then((res) => {
        setGender1(res.data);
      })
          .catch((err) => {
            console.log(err)
          })
    }

    const getSalution = () => {
      InsuranceApi.getParameterRule("G0002").then((res) => {
        setGender2(res.data);
      })
          .catch((err) => {
            console.log(err)
          })
    }

      const getAddress = () => {
          InsuranceApi.getAllAddress(sessionStorage.getItem("userid")).then((res) => {
              setAddress(res.data);
          })
              .catch((err) => {
                  console.log(err)
              })
      }

    const getBankAccounts = () => {
          axios.get(`http://localhost:8090/bank/getall/` + sessionStorage.getItem("userid"), {
              headers: {
                  Authorization: `Bearer ${sessionStorage.getItem("token")}`,
              }
          }).then((res) => {
              setBankAccount(res.data);
          })
              .catch((err) => {
                  console.log(err)
              })
      }


  function toggle(value){
    return !value;
  }



  const [applicationId, setApplicationId] = useState("");
  const [application, setApplication] = useState(" ");

    const [surName, setSurName] = useState("");
    const [givenName, setGivenName] = useState(" ");
    const [salutation, setSalutation] = useState("");
    const [gender, setGender] = useState("");
    const [marritalStatus, setMarritalStatus] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [postalCode, setPostalCode] = useState(0);
    const [country, setCountry] = useState("");
    const [nationality, setNationality] = useState("");
    const [companyDoctor, setCompanyDoctor] = useState(false);
    const [birthdate, setBirthdate] = useState("");
    const [birthPlace, setBirthPlace] = useState("");
    const [language, setLanguage] = useState("");
    const [category, setCategory] = useState("");
    const [occupation, setOccupation] = useState("");
    const [addressid, setAddressid] = useState(0);
    const [bankId, setBankId] = useState(0);


  const getapplication = (id) => {
    axios.get(`http://localhost:8090/candidates/application/${id}`).then((res) => {
      setApplication(res.data);
    })
        .catch((err) => {
          console.log(err);
        })
  }



    const saveClient = () => {

      const birthDate = moment(birthdate).format("MM-DD-YYYY")

      const client = {surName, givenName, salutation, gender, marritalStatus, mobileNumber, postalCode, country, nationality, companyDoctor, birthDate, birthPlace, language, category, occupation, addressid, bankId};

      InsuranceApi.addClients(client).then((res) => {
        console.log(res.data)
       if(modal === true){
         clientclose();
       }
       handleClose();
       getall();
      })
          .catch((err) => {
            console.log(err)
          })
    }


  //For address
  const [addressopen, setAddressopen] = useState(false);
  const showaddress = () => {
    setAddressopen(true);
  };

  const closeaddress = () => {
    setAddressopen(false);
      InsuranceApi.getAllAddress().then((res) => {
        setAddress(res.data);
      })
          .catch((err) => {
            console.log(err)
          })
  };

  //for bank
  const [bankopen, setBankopen] = useState(false);
  const showBank = () => {
    setBankopen(true);
  };

  const closeBank = () => {
    setBankopen(false);
    axios.get(`http://localhost:8090/bank/getall`).then((res) => {
      setBankAccount(res.data);
    })
        .catch((err) => {
          console.log(err)
        })
  };


  return (
    <div>

              <br/>
              {/*<div className="row">*/}
              {/*  <div className="col">*/}
              {/*    <input type="text" onChange={(e) => setApplicationId(e.target.value)}/>*/}
              {/*  </div>*/}
              {/*  <div className="col">*/}
              {/*    <Button*/}
              {/*        color="primary"*/}
              {/*        onClick={() => getapplication(applicationId)}*/}
              {/*    >*/}
              {/*      Get*/}
              {/*    </Button>*/}
              {/*  </div>*/}
              {/*</div>*/}

              <hr/>

              <form autoComplete="off">
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={8} md={6} lg={4}>
                      <TextField
                        label="Sur Name"
                        className="formtext"
                        placeholder="Sur Name"
                        fullWidth
                        onChange={(e) => setSurName(e.target.value)}
                        variant="outlined"
                        margin="dense"
                      />
                    </Grid>
                    <Grid item xs={8} md={6} lg={4}>
                      <TextField
                          label="Given Name"
                          className="formtext"
                          placeholder="Given Name"
                          fullWidth
                          onChange={(e) => setGivenName(e.target.value)}
                          variant="outlined"
                          margin="dense"
                      />
                    </Grid>
                    <Grid item xs={8} md={6} lg={4}>
                      <TextField
                          select
                          label="Salution"
                          className="formtext"
                          placeholder="Salution"
                          fullWidth
                          variant="outlined"
                          onChange={(e) => setSalutation((e.target.value))}
                          margin="dense"
                      >
                        {
                          gender2.map((sal) => (
                              <MenuItem value={sal}> {sal} </MenuItem>
                          ))
                        }
                      </TextField>
                    </Grid>
                    <Grid item xs={8} md={6} lg={4}>
                      <TextField
                          select
                          label="Gender"
                          className="formtext"
                          placeholder="Gender"
                          fullWidth
                          onChange={(e) => setGender(e.target.value)}
                          variant="outlined"
                          margin="dense"
                      >
                        {
                          gender1.map((gender) => (
                              <MenuItem value={gender}> {gender} </MenuItem>
                          ))
                        }
                      </TextField>
                    </Grid>
                    <Grid item xs={8} md={6} lg={4}>
                      <TextField
                          select
                          label="Marrital Status"
                          className="formtext"
                          placeholder="Marrital Status"
                          fullWidth
                          variant="outlined"
                          onChange={(e) => setMarritalStatus(e.target.value)}
                          margin="dense"
                      >
                        {
                          relationship.map((relationship) => (
                              <MenuItem value={relationship}> {relationship} </MenuItem>
                          ))
                        }
                      </TextField>
                    </Grid>
                    <Grid item xs={8} md={6} lg={4}>
                      <TextField
                        type="number"
                        label="Mobile Number"
                        className="formtext"
                        placeholder="Mobile Number"
                        fullWidth
                        variant="outlined"
                        onChange={(e) => setMobileNumber(e.target.value) }
                        margin="dense"
                      />
                    </Grid>
                    <Grid item xs={8} md={6} lg={4}>
                      <TextField
                        type="number"
                        label="Postal Code"
                        className="formtext"
                        placeholder="Postal Code"
                        fullWidth
                        variant="outlined"
                        onChange={(e) => setPostalCode(e.target.value) }
                        margin="dense"
                      />
                    </Grid>
                    <Grid item xs={8} md={6} lg={4}>
                      <TextField
                        label="Country"
                        className="formtext"
                        placeholder="Country"
                        fullWidth
                        variant="outlined"
                        onChange={(e) => setCountry(e.target.value) }
                        margin="dense"
                      />
                    </Grid>
                    <Grid item xs={8} md={6} lg={4}>
                      <TextField
                        label="Nationality"
                        className="formtext"
                        placeholder="Nationality"
                        fullWidth
                        onChange={(e) => setNationality(e.target.value)}
                        variant="outlined"
                        margin="dense"
                      />
                    </Grid>
                    <Grid item xs={8} md={6} lg={4}>
                      <FormControl
                        style={{ marginTop: "0.5rem" }}
                        className="formtext"
                        fullWidth
                      >
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DatePicker
                            inputFormat="dd/MM/yyyy"
                            label="Birth Date"
                            placeholder="Birth Date"
                            fullWidth
                            value={birthdate}
                            onChange={(date) => setBirthdate(date)}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </LocalizationProvider>
                      </FormControl>
                    </Grid>
                    <Grid item xs={8} md={6} lg={4}>
                      <FormControlLabel
                          fullWidth
                          className="checktext"
                          control={<Checkbox lable="Company Doctor:"  onChange={(e) => setCompanyDoctor(toggle)}  />}
                          label="Company Doctor:"
                      />
                    </Grid>

                    <Grid item xs={8} md={6} lg={4}>
                      <TextField
                        label="Birth Place"
                        className="formtext"
                        placeholder="Birth Place"
                        fullWidth
                        onChange={(e) => setBirthPlace(e.target.value)}
                        variant="outlined"
                        margin="dense"
                      />
                    </Grid>
                    <Grid item xs={8} md={6} lg={4}>
                      <TextField
                        label="Language"
                        className="formtext"
                        placeholder="Language"
                        fullWidth
                        variant="outlined"
                        onChange={(e) => setLanguage(e.target.value)}
                        margin="dense"
                      />
                    </Grid>
                    <Grid item xs={8} md={6} lg={4}>
                      <TextField
                        label="Category"
                        className="formtext"
                        placeholder="Category"
                        fullWidth
                        variant="outlined"
                        onChange={(e) => setCategory(e.target.value)}
                        margin="dense"
                      />
                    </Grid>
                    <Grid item xs={8} md={6} lg={4}>
                      <TextField
                          select
                        label="Occupation"
                        className="formtext"
                        placeholder="Occupation"
                        fullWidth
                        variant="outlined"
                        onChange={(e) => setOccupation((e.target.value)) }
                        margin="dense"
                      >
                        {
                          work.map((wk) => (
                              <MenuItem value={wk}> {wk} </MenuItem>
                          ))
                        }

                      </TextField>
                    </Grid>
                    <Grid item xs={8} md={6} lg={4} style={{ display: "flex" }}>
                      <TextField
                        select
                        label="Address"
                        labelId="demo-simple-select-label"
                        className="formtext"
                        placeholder="Address"
                        fullWidth
                        onChange={(e) => setAddressid(e.target.value)}
                        variant="outlined"
                        margin="dense"
                      >
                          {
                              address.map((address) => (
                                  <MenuItem value={address.id}>  {address.toAddress} - {address.id}  </MenuItem>
                              ))
                          }
                      </TextField>
                    </Grid>
                    <Grid item xs={8} md={6} lg={4}>
                      <Button
                        style={{ marginTop: "1rem", paddingRight:2 }}
                        variant="contained"
                        color="error"
                        onClick={() => showaddress()}
                        startIcon={<AddCircleIcon />}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                  <Grid item xs={8} md={6} lg={4} style={{display:"flex"}}>
                    <TextField
                        select
                        label="Bank Account"
                        labelId="demo-simple-select-label"
                        className="formtext"
                        placeholder="Bank Account"
                        fullWidth
                        onChange={(e) => setBankId(e.target.value)}
                        variant="outlined"
                        margin="dense"
                    >
                      {
                        bankAccount.map((bank) => (
                            <MenuItem value={bank.id}> {bank.accountHolderName} - {bank.id} </MenuItem>
                        ))
                      }
                    </TextField>
                  </Grid>
                  <Grid item xs={8} md={6} lg={4}>
                    <Button
                        style={{ marginTop: "1rem", paddingRight:2 }}
                        variant="contained"
                        color="error"
                        onClick={(e) => showBank()}
                        startIcon={<AddCircleIcon />}
                    />
                  </Grid> </Grid>
                </Box>
              </form>

      <br/>
          <Button style={{marginRight:10}} color="primary" variant="contained" onClick={(e) => saveClient(e)}>
            {"Save"}
          </Button>
      { open === true ?
        <Button onClick={handleClose} color="error" variant="contained">
        Cancel
      </Button> : null }

      <ClientDetailsEdit address={address} bankAccount={bankAccount} gender1={gender1} gender2={gender2} work={work}  relationship={relationship}/>

      <Modal
          show={addressopen}
          onHide={closeaddress}
          size="lg"
          centered
      >
        <Modal.Header closeButton> <Modal.Title> <h4>  Client Address Add </h4> </Modal.Title> </Modal.Header>
          <Modal.Body>
            <div className="container">
            <ClientAddressAdd close={closeaddress}/>
            </div>
            <br/>
            <Button
              color="error"
              variant="contained"
              style={{marginLeft:10}}
              onClick={() => closeaddress()}> Cancel </Button>
          </Modal.Body>
      </Modal>



      <Modal
          show={bankopen}
          onHide={closeBank}
          size="lg"
          centered
      >

        <Modal.Header closeButton><Modal.Title> <h4>  Client Bank Add </h4> </Modal.Title> </Modal.Header>
          <Modal.Body>
            <div className="container">
              <BankAccountAdd close={closeBank}/></div>
            <br/>
            <Button
                color="error"
                variant="contained"
                style={{marginLeft:10}}
                onClick={() => closeBank()}> Cancel </Button>
          </Modal.Body>
      </Modal>

    </div>
  );
}
export default ClientDetailsAdd;
