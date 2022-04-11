import React from 'react';
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

 function AgentTypeAdd( {
    open,
    data,
    handleClickClose,
   setData,
   getData,
   
  }){
    let {  id,agentLevelDesc,agentLevelId,isValid } = data;  

    //Add
    const handleChange = (e) => {
      const { value, name } = e.target;
      setData({ ...data, [name]: value });
    };

    //POST
    const handleFormSubmit = () => {
      axios
        .post(`http://localhost:8080/agentType/add`, data)
        .then((resp) => {
          console.log(resp);
          handleClickClose();
          getData();
          setData(data);
          alert("Agent Type level Added Succesfully");
        });
    };
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
          Add New AgentType Level
          </h2>
          <DialogContent>
        <form>

              {/* <div style={{ display: "flex" }}>
              <div>
                  <TextField
                  placeholder="id"
                    name="id"
                    value={id}
                    margin="dense"
                    variant="outlined"
                    onChange={(e) => onChange(e)}
                  />
                </div>
                </div> */}

                <div style={{ display: "flex" }}>
                <div>
                  <TextField
                  placeholder="agent Level Desc"
                    name="agentLevelDesc"
                    value={agentLevelDesc}
                    margin="dense"
                    variant="outlined"
                    onChange={(e) => handleChange(e)}
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
                    onChange={(e) => handleChange(e)}
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
        onClick={() => handleFormSubmit()}
        >
        Submit
        </Button>
        </DialogActions>
    </Dialog>
</div>
);
}

            

export default AgentTypeAdd;