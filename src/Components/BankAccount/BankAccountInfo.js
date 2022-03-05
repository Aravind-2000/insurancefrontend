import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import {Checkbox} from "@mui/material";

function BankAccountInfo({
  open,
  data,
  handleClickClose,

  
}) {
  let {  accountHolderName,accountNumber, bankName, ifscCode, bankBranch, isActive,createdDate, modifiedDate} = data;
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
          Details of client BankAccount 
        </h2>
        <DialogContent>
          <form>
            <div style={{ display: "flex" }}>
            {/* <div>
                <TextField inputProps={{ readOnly: true }}
                placeholder="id"
                  name="id"
                  value={id}
                  margin="dense"
                  variant="outlined"
                  
                />
              </div> */}
              <div>
                <TextField inputProps={{ readOnly: true }}
                placeholder="bank client name"
                  name="accountHolderName"
                  value={accountHolderName}
                  margin="dense"
                  variant="outlined"
                  
                />
              </div>
              <div>
                <TextField inputProps={{ readOnly: true }}
                placeholder="account number"
                  name="accountNumber"
                  value={accountNumber}
                  margin="dense"
                  variant="outlined"
                  
                />
              </div>
              </div>
            <div style={{ display: "flex" }}>
            <div>
                <TextField inputProps={{ readOnly: true }}
                placeholder="Bank name"
                  name="bankName"
                  value={bankName}
                  margin="dense"
                  variant="outlined"
                  
                />
              </div>
              <div>
                <TextField inputProps={{ readOnly: true }}
                placeholder="IFCS Code"
                  name="ifscCode"
                  value={ifscCode}
                  margin="dense"
                  variant="outlined"
                  
                />
              </div>
              </div>

              <div style={{ display: "flex" }}>
              <div>
                <TextField inputProps={{ readOnly: true }}
                placeholder="Bank branch"
                  name="bankBranch"
                  value={bankBranch}
                  margin="dense"
                  variant="outlined"
                  
                />
              </div>
              {/* <div>*/}
              {/*  <TextField inputProps={{ readOnly: true }}*/}
              {/*  placeholder="is-active"*/}
              {/*    name="isActive"*/}
              {/*    value={isActive}*/}
              {/*    margin="dense"*/}
              {/*    variant="outlined"*/}

              {/*  />*/}
              {/*</div>*/}

                <div>

                  <Checkbox
                      aria-label={"Is Active"}
                      name="isActive"
                      checked={isActive}
                  />
                </div>
              </div>
              <div style={{ display: "flex" }}>
              <div>
                <TextField inputProps={{ readOnly: true }}
                placeholder="created date"
                  name="createdDate"
                  value={createdDate}
                  margin="dense"
                  variant="outlined"
                  
                />
              </div>
              <div>
                <TextField inputProps={{ readOnly: true }}
                  name="modifiedDate"
                  value={modifiedDate}
                  margin="dense"
                  variant="outlined"
                  
                />
              </div>
              </div>
              
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickClose} color="primary" variant="contained">
            Close
          </Button>
          
        </DialogActions>
      </Dialog>
    </div>
  );
}
  
  export default BankAccountInfo;
  