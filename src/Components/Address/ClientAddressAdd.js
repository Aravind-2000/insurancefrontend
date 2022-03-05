import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  InputLabel,
  Select,
  FormControl,
  Grid,
  Box,
} from "@mui/material";
import "../Css/ContentAdd.css";
import { Checkbox, MenuItem } from "@material-ui/core";
import FormControlLabel from "@mui/material/FormControlLabel";
import InsuranceApi from "../../Service/InsuranceApi";

function ClientAddressAdd({ open, handleClose,getall
}) {

  const [toAddress, setToAddress] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [pincode, setPincode] = useState("");
  const [addressType, setAddressType] = useState("");
  const [isPresentAddress, setIsPresentAddress] = useState(false);

  const [addresstype, setaddressType] = useState([]);

  useEffect(() => {
    InsuranceApi.getParameterRule("A0001").then((res) => {
      setaddressType(res.data);
    })
        .catch((error) => {
          console.log(error);
        })
  }, []);



  const addAddress = () => {

    const data = {toAddress, addressLine1, addressLine2, city, state, country, pincode, addressType, isPresentAddress};

    InsuranceApi.saveAddress(data).then((res) => {
      console.log(res.data);
      handleClose();
      getall();
    })
        .catch((error) => {
          console.log(error);
        })
  }

  function toggle(value){
    return !value;
  }


  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="md"
      >
        <h2 className="headings">Client Details Add</h2>
        <DialogContent>
          <form autoComplete="off">
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                      label="To"
                      className="formtext"
                      placeholder="To"
                      name="toAddress"
                      onChange={(e) => setToAddress(e.target.value)}
                      fullWidth
                      variant="outlined"
                      margin="dense"
                  />
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Address Line 1"
                    className="formtext"
                    placeholder="Address Line 1"
                    fullWidth
                    variant="outlined"
                    name="addressLine1"

                    onChange={(e) => setAddressLine1(e.target.value)}
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Address Line 2"
                    className="formtext"
                    placeholder="Address Line 2"
                    fullWidth
                    variant="outlined"
                    name="addressLine2"

                    onChange={(e) => setAddressLine2(e.target.value)}
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="City"
                    className="formtext"
                    placeholder="City"
                    fullWidth
                    name="city"

                    onChange={(e) => setCity(e.target.value)}
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="State"
                    labelId="demo-simple-select-label"
                    className="formtext"
                    placeholder="State"
                    fullWidth
                    variant="outlined"
                    name="state"

                    onChange={(e) => setState(e.target.value)}
                    margin="dense"
                  >
                  </TextField>
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Country"
                    className="formtext"
                    placeholder="Country"
                    fullWidth
                    name="country"

                    onChange={(e) => setCountry(e.target.value)}
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    type="number"
                    label="Pincode"
                    className="formtext"
                    placeholder="Pincode"
                    fullWidth
                    name="pincode"

                    onChange={(e) => setPincode(e.target.value)}
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                      select
                    label="Address Type"
                    className="formtext"
                    placeholder="Address Type"
                    fullWidth
                      name="addressType"

                      onChange={(e) => setAddressType(e.target.value)}
                    variant="outlined"
                    margin="dense"
                  >
                    {
                      addresstype.map((address) => (
                        <MenuItem value={address}> {address} </MenuItem>
                        ))
                    }
                  </TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <FormControlLabel
                      fullWidth
                      className="checktext"
                      control={<Checkbox lable="isPresentAddress:" checked={isPresentAddress} name="isPresentAddress"  onChange={(e) => setIsPresentAddress(toggle)} />}
                      label="isPresentAddress:"
                  />
                </Grid>
              </Grid>
            </Box>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error" variant="contained">
            Cancel
          </Button>
          <Button color="primary" variant="contained" onClick={(e) => addAddress(e)}>
            {"Submit"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ClientAddressAdd;
