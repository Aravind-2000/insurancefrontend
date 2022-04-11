import React from 'react';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

function AgentTypeInfo({
    open,
    data,
    handleClickClose,
}) {

    let {  id,agentLevelDesc,agentLevelId,isValid } = data; 

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
            Details AgentType Level
            </h2>
            <DialogContent>
          <form>

                <div style={{ display: "flex" }}>
                <div>
                  <TextField inputProps={{ readOnly: true }}
                  placeholder="id"
                    name="id"
                    value={id}
                    margin="dense"
                    variant="outlined"
                    
                  />
                </div>
                </div>

                <div style={{ display: "flex" }}>
                <div>
                  <TextField inputProps={{ readOnly: true }}
                  placeholder="agent Level Desc"
                    name="agentLevelDesc"
                    value={agentLevelDesc}
                    margin="dense"
                    variant="outlined"
                    
                  />
                </div>
                </div>

                <div style={{ display: "flex" }}>
                <div>
                  <TextField inputProps={{ readOnly: true }}
                  placeholder="agent Level Id"
                    name="agentLevelId"
                    value={agentLevelId}
                    margin="dense"
                    variant="outlined"
                   
                  />
                </div>
                </div>
                
                {/* <div style={{ display: "flex" }}>
                <div>
                  <TextField inputProps={{ readOnly: true }}
                  placeholder="is Valid"
                    name="isValid"
                    value={isValid}
                    margin="dense"
                    variant="outlined"
                
                  />
                </div>
                </div> */}

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

export default AgentTypeInfo;