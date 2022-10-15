import React, { useState } from "react";
import { Paper, Box, Grid, TextField, Button, Typography } from "@mui/material";
import InsuranceApi from "../../Service/InsuranceApi";

const ChangePassword = () => {
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 500,
    margin: "20px auto",
  };

  const btnstyle = { margin: "8px 0", marginLeft: "12.5rem" };

  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [usermail, setusermail] = useState("");

  const [passError, setpassError] = useState("");

  const ChangePasswordSubmit = () => {
    InsuranceApi.updateUserPassword(usermail, confirmPassword)
      .then((res) => {
        console.log(res.data);
        window.location = "login";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const checkingPassword = (e) => {
    e.preventDefault();
    if (password !== null && confirmPassword !== null) {
      if (password === confirmPassword) {
        setpassError("");
        return ChangePasswordSubmit();
      } else {
        setpassError("Both Passwords doesn't match");
        return false;
      }
    }
  };

  return (
    <div>
      <Paper elevation={10} style={paperStyle}>
        <br /> <br />
        <form onSubmit={checkingPassword} autoComplete="off">
          <Box sx={{ flexGrow: 1 }}> 
            <Grid container spacing={2}>
              <TextField
                className="formtext"
                label="E-Mail"
                value={usermail}
                placeholder="Enter your  E-Mail"
                onChange={(e) => setusermail(e.target.value)}
                fullWidth
                required
              />
              <br />
              <TextField
                className="formtext"
                label="New Password"
                value={password}
                placeholder="Enter new password"
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                required
              />
              <br />
              <TextField
                className="formtext"
                label="Confirm Password"
                value={confirmPassword}
                placeholder="Confirm new password"
                onChange={(e) => setconfirmPassword(e.target.value)}
                fullWidth
                required
              />

              <Typography style={{ color: "red", margin: 50 }}>
                {passError}
              </Typography>
            </Grid>
          </Box>

          <Button
            type="submit"
            color="secondary"
            variant="contained"
            style={btnstyle}
          >
            Confirm
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default ChangePassword;
