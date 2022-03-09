import React,{useState} from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";

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
            .post(`http://localhost:8090/bank/add`, bankAccountData)
            .then((resp) => {
                console.log(resp);
                close();
                handleClickClose();

            });
    };

    return (
      <div>
            <form>
              <div style={{ display: "flex" }}>
              {/* <div>
                  <TextField
                  placeholder="id"
                    name="id"
                    value={id}
                    margin="dense"
                    variant="outlined"
                    onChange={(e) => onChange(e)}
                  />
                </div> */}
                <div>
                  <TextField
                  placeholder="bank client name"
                    name="accountHolderName"
                    margin="dense"
                    variant="outlined"
                    onChange={(e) => setAccountHolderName(e.target.value)}
                  />
                </div>
                <div>
                  <TextField
                  placeholder="account number"
                    name="accountNumber"
                    value={accountNumber}
                    margin="dense"
                    variant="outlined"
                    onChange={(e) => setAccountNumber(e.target.value)}
                  />
                </div>
                </div>
              <div style={{ display: "flex" }}>
              <div>
                  <TextField
                  placeholder="Bank name"
                    name="bankName"
                    value={bankName}
                    margin="dense"
                    variant="outlined"
                    onChange={(e) => setBankName(e.target.value)}
                  />
                </div>
                <div>
                  <TextField
                  placeholder="IFCS Code"
                    name="ifscCode"
                    value={ifscCode}
                    margin="dense"
                    variant="outlined"
                    onChange={(e) => setIfscCode(e.target.value)}
                  />
                </div>
                </div>

                <div style={{ display: "flex" }}>
                <div>
                  <TextField
                  placeholder="Bank branch"
                    name="bankBranch"
                    value={bankBranch}
                    margin="dense"
                    variant="outlined"
                    onChange={(e) => setBankBranch(e.target.value)}
                  />
                </div>
                {/* <div>
                  <TextField
                  placeholder="is-active"
                    name="is_active"
                    value={is_active}
                    margin="dense"
                    variant="outlined"
                    onChange={(e) => onChange(e)}
                  />
                </div> */}
                </div>
                {/*<div style={{ display: "flex" }}>*/}
                {/*<div>*/}
                {/*  <TextField*/}
                {/*  placeholder="created date"*/}
                {/*    name="created_date"*/}
                {/*    value={created_date}*/}
                {/*    margin="dense"*/}
                {/*    variant="outlined"*/}
                {/*    onChange={(e) => onChange(e)}*/}
                {/*  />*/}
                {/*</div>*/}
                {/*<div>*/}
                {/*  <TextField*/}
                {/*    name="modified_date"*/}
                {/*    value={modified_date}*/}
                {/*    margin="dense"*/}
                {/*    variant="outlined"*/}
                {/*    onChange={(e) => onChange(e)}*/}
                {/*  />*/}
                {/*</div>*/}
                {/*</div>*/}
                
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
  