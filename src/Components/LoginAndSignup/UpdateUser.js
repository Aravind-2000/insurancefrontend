import React, { useState } from "react";
import InsuranceApi from "../../Service/InsuranceApi";
import { Box, Grid, MenuItem, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { FileUploader } from "react-drag-drop-files";

const UpdateUser = ({ userid, roles, close, userdetails, setUserdetails }) => {
  const editChange = (e) => {
    const { name, value } = e.target;
    setUserdetails({ ...userdetails, [name]: value });
  };

  // const [profilePicture, setprofilePicture] = useState("");

  const fileTypes = ["JPG", "PNG", "GIF", "JPEG"]
  const [file, setFile] = useState(null);
  const handleFileChange = (file) => {
    setFile(file);
  };

  const formSubmit = async () => {

    if (file) {
      const base64 = await convertBase64(file)
      const body = {
      username: userdetails.username,
      email: userdetails.email,
      agentId: userdetails.agentId,
      roleId: userdetails.roleId,
      profilePicture: base64,
    };
    sessionStorage.setItem("username", userdetails.username);
    sessionStorage.setItem("agent", userdetails.agentId);
    InsuranceApi.updateUser(userid, body)
      .then((res) => {
        close();
        window.location = "logindetails";
      })
      .catch((err) => console.log(err));
    }
  };

  // const uploadImage = async (e) => {
  //   const file = e.target.files[0];
  //   const base64 = await convertBase64(file);
  //   setprofilePicture(base64);
  // };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  

  return (
    <div>
      <form autoComplete="off">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <br />
            <TextField
              className="formtext"
              label="Username"
              value={userdetails?.username}
              name="username"
              placeholder="Enter username"
              onChange={(e) => editChange(e)}
              fullWidth
              required
            />

            <br />

            <TextField
              className="formtext"
              label="E-Mail"
              value={userdetails?.email}
              name="email"
              placeholder="Enter E-Mail"
              onChange={(e) => editChange(e)}
              fullWidth
              required
            />

            <br />

            <TextField
              className="formtext"
              label="Agent ID"
              value={userdetails?.agentId}
              name="agentId"
              placeholder="Enter your Agent ID"
              onChange={(e) => editChange(e)}
              fullWidth
              required
            />

            <br />

            <TextField
              select
              className="formtext"
              label="Role"
              value={userdetails?.roleId}
              name="roleId"
              placeholder="Enter your role"
              onChange={(e) => editChange(e)}
              fullWidth
              required
            >
              {roles.map((val) => (
                <MenuItem value={val.id}> {val.roleName} </MenuItem>
              ))}
            </TextField>

            <br />

            <div style={{margin:30}}>
              <FileUploader
                hoverTitle="Drop Here"
                label="Drop your picture here"
                handleChange={handleFileChange}
                name="file"
                types={fileTypes}
              />
            </div>

            <div style={{ margin: 30 }}>
              <Button
                color="primary"
                variant="contained"
                style={{ marginRight: 10 }}
                onClick={() => formSubmit()}
              >
                Update
              </Button>
              <Button
                color="error"
                variant="contained"
                style={{ marginRight: 10 }}
                onClick={() => close()}
              >
                Cancel
              </Button>
            </div>
          </Grid>
        </Box>
      </form>
    </div>
  );
};

export default UpdateUser;
