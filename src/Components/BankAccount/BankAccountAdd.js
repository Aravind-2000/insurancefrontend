import React,{useState} from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";
import {Box, Grid} from "@mui/material";

function BankAccountAdd({

    handleClickClose,close
  }) {



    const [accountHolderName, setAccountHolderName] = useState(" ");
    const [accountNumber, setAccountNumber] = useState("");
    const [ifscCode, setIfscCode] = useState("");
    const [bankName, setBankName] = useState("");
    const [bankBranch, setBankBranch] = useState("");



    const handleFormSubmit = () => {

        const bankAccountData={accountNumber, accountHolderName, ifscCode, bankBranch, bankName};

        axios
            .post(`http://localhost:8090/bank/add/` + sessionStorage.getItem("userid"), bankAccountData, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                }
            })
            .then((resp) => {
                console.log(resp);
                close();
                handleClickClose();
            });
    };

    return (
      <div>
            <form autoComplete="off">
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                label="Name "
                                className="formtext"
                                placeholder="Account Holder Name"
                                fullWidth
                                onChange={(e) => setAccountHolderName(e.target.value)}
                                variant="outlined"
                                margin="dense"
                            />
                        </Grid>
                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                label="Account Number "
                                className="formtext"
                                placeholder="Account Number "
                                fullWidth
                                onChange={(e) => setAccountNumber(e.target.value)}
                                variant="outlined"
                                margin="dense"
                            />
                        </Grid>
                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                label="IFSC "
                                className="formtext"
                                placeholder="IFSC Code"
                                fullWidth
                                onChange={(e) => setIfscCode(e.target.value)}
                                variant="outlined"
                                margin="dense"
                            />
                        </Grid>
                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                label=" Bank Name "
                                className="formtext"
                                placeholder="Bank Name"
                                fullWidth
                                onChange={(e) => setBankName(e.target.value)}
                                variant="outlined"
                                margin="dense"
                            />
                        </Grid>
                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                label="Bank Branch "
                                className="formtext"
                                placeholder="Bank Branch"
                                fullWidth
                                onChange={(e) => setBankBranch(e.target.value)}
                                variant="outlined"
                                margin="dense"
                            />
                        </Grid>
                    </Grid>
                </Box>
            </form>
          <br/>
            <Button
              color="primary"
              variant="contained"
              onClick={() => handleFormSubmit()}
            >
              Submit
            </Button>
      </div>
    );
  }
  
  export default BankAccountAdd;
  