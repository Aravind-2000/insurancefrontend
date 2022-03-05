import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

function BankAccountEdit({
  open,
  data,
  handleClickClose,
  onChange,
  handleFormSubmit,
}) {
  let {  accountHolderName,accountNumber, bankName, ifscCode, bankBranch, isActive} = data;
  return (
    <div>
      <Dialog open={open} onClose={handleClickClose}>
        <h2
          style={{
            backgroundColor: "red",
            color: "white",
            textAlign: "center",
          }}
        >
          Edit client BankAccount 
        </h2>
        <DialogContent>
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
                  value={accountHolderName}
                  margin="dense"
                  variant="outlined"
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div>
                <TextField
                placeholder="account number"
                  name="accountNumber"
                  value={accountNumber}
                  margin="dense"
                  variant="outlined"
                  onChange={(e) => onChange(e)}
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
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div>
                <TextField
                placeholder="IFCS Code"
                  name="ifscCode"
                  value={ifscCode}
                  margin="dense"
                  variant="outlined"
                  onChange={(e) => onChange(e)}
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
                  onChange={(e) => onChange(e)}
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
              <div style={{ display: "flex" }}>
              <div>
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
              </div>
              </div>
              
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickClose} color="error" variant="outlined">
            Cancel
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={() => handleFormSubmit()}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
  
  export default BankAccountEdit;
  