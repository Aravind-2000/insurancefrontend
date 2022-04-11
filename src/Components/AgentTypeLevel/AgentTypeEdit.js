import React from 'react';
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

function AgentTypeEdit({
    open,
    data,
    setData,
    handleClickClose,
    getData,
    
  }) {

//Edit
const editChange = (e) => {
  const { value, name } = e.target;
  setData({ ...data, [name]: value });
};

    //PATCH - update

    const editFormSubmit = () => {
      const confirm = window.confirm(
        "Are you sure, you want to update this row"
      );
      if (confirm) { 
      axios
        .patch(`http://localhost:8080/agentType/${data.id}`, data)
        .then((resp) => {
          console.log(resp);
          handleClickClose();            
          getData();          
          alert("Agent Type level Updated Succesfully");           
        });
      }
    };

    let {  id,agentLevelDesc,agentLevelId,isValid } = data;  

    return (
      <div>
          <Dialog open={open} onClose={handleClickClose}>
            <h2
              style={{
                backgroundColor: "Peru",
                color: "white",
                textAlign: "center",
              }}
            >
            Edit AgentType Level
            </h2>
            <DialogContent>
          <form>

                <div style={{ display: "flex" }}>
                <div>
                  <TextField
                  placeholder="agent Level Desc"
                    name="agentLevelDesc"
                    value={agentLevelDesc}
                    margin="dense"
                    variant="outlined"
                    onChange={(e) => editChange(e)}
                  />
                </div>
                </div>

                <div style={{ display: "flex" }}>
                <div>
                  <TextField
                  placeholder="agent Level Id"
                    name="agentLevelId"
                    value={agentLevelId}
                    margin="dense"
                    variant="outlined"
                    onChange={(e) => editChange(e)}
                  />
                </div>
                </div>
                
                {/* <div style={{ display: "flex" }}>
                <div>
                  <TextField
                  placeholder="is Valid"
                    name="isValid"
                    value={isValid}
                    margin="dense"
                    variant="outlined"
                    onChange={(e) => onChange(e)}
                  />
                </div>
                </div> */}

                </form>
                </DialogContent>
                <DialogActions>
        
                <Button onClick={handleClickClose} color="error" variant="outlined">
                Cancel
                </Button>
                <Button
                color="primary"
                variant="contained"
                onClick={() => editFormSubmit()}
                >
                Submit
                </Button>
             </DialogActions>
            </Dialog>
</div>
);
}         
export default AgentTypeEdit;
