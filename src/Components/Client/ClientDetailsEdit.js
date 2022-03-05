import React, {useState, useEffect, useCallback} from "react";
import {Modal} from "react-bootstrap";
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
import axios from "axios";
import { Checkbox, MenuItem } from "@material-ui/core";
import FormControlLabel from "@mui/material/FormControlLabel";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import "../Css/Content.css"
import InsuranceApi from "../../Service/InsuranceApi";
import moment from "moment";

function ClientDetailsEdit({ open,close, data, setData, getall}) {

    const [address, setAddress] = useState([]);
    const [bankAccount, setBankAccount] = useState([]);
    const [gender1, setGender1] = useState([]);
    const [gender2, setGender2] = useState([]);
    const [relationship, setRelationship] = useState([]);
    const [work, setWork] = useState([]);

    useEffect(() => {
        getAddress();
        getBankAccounts();
        getGender();
        getSalution();
        marriage();
        working();
    }, []);


    const working = () => {
        InsuranceApi.getParameterRule("W0001").then((res) => {
            setWork(res.data);
        })
            .catch((err) => {
                console.log(err)
            })
    }

    const marriage = () => {
        InsuranceApi.getParameterRule("R0001").then((res) => {
            setRelationship(res.data);
        })
            .catch((err) => {
                console.log(err)
            })
    }

    const getGender = () => {
        InsuranceApi.getParameterRule("G0001").then((res) => {
            setGender1(res.data);
        })
            .catch((err) => {
                console.log(err)
            })
    }

    const getSalution = () => {
        InsuranceApi.getParameterRule("G0002").then((res) => {
            setGender2(res.data);
        })
            .catch((err) => {
                console.log(err)
            })
    }

    const getAddress = () => {
        InsuranceApi.getAllAddress().then((res) => {
            setAddress(res.data);
        })
            .catch((err) => {
                console.log(err)
            })
    }

    const getBankAccounts = () => {
        axios.get(`http://localhost:8090/bank/getall`).then((res) => {
            setBankAccount(res.data);
        })
            .catch((err) => {
                console.log(err)
            })
    }



    function toggle(value){
        return !value;
    }

    const datebirthchange = (date) =>{
        setData({...data, birthDate: date});
    }

    const editChange = (e) =>{
        const { value, name } = e.target;
        setData({ ...data, [name]: value });
    }

    const updateClient = (id) => {

        const client = {
            surName: data.surName,
            givenName: data.givenName,
            salutation: data.salutation,
            gender: data.gender,
            marritalStatus: data.marritalStatus,
            mobileNumber: data.mobileNumber,
            postalCode: data.postalCode,
            country: data.country,
            nationality: data.nationality,
            companyDoctor: data.companyDoctor,
            birthDate: moment(data.birthDate).format("DD-MM-YYYY"),
            birthPlace: data.birthPlace,
            language: data.language,
            category: data.category,
            occupation: data.occupation,
            addressid: data.addressid,
            bankId: data.bankId
        }


        InsuranceApi.updateClient(id, client).then((res) => {
            console.log(res.data)
        })
            .catch((err) => {
                console.log(err)
            })
        close();
        getall();
    }


    return (
        <div>
            <Dialog
                open={open}
                onClose={close}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth="md"
            >
                <>
                    <h2 className="headings">Client Details Add</h2>
                    <DialogContent>
                        <form autoComplete="off">
                            <Box sx={{ flexGrow: 1 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={8} md={6} lg={4}>
                                        <TextField
                                            label="Sur Name"
                                            className="formtext"
                                            placeholder="Sur Name"
                                            fullWidth
                                            name="surName"
                                            value={data?.surName}
                                            onChange={(e) => editChange(e)}
                                            variant="outlined"
                                            margin="dense"
                                        />
                                    </Grid>
                                    <Grid item xs={8} md={6} lg={4}>
                                        <TextField
                                            label="Given Name"
                                            className="formtext"
                                            placeholder="Given Name"
                                            fullWidth
                                            name="givenName"
                                            value={data?.givenName}
                                            onChange={(e) => editChange(e)}
                                            variant="outlined"
                                            margin="dense"
                                        />
                                    </Grid>
                                    <Grid item xs={8} md={6} lg={4}>
                                        <TextField
                                            select
                                            label="Salution"
                                            className="formtext"
                                            placeholder="Salution"
                                            fullWidth
                                            variant="outlined"
                                            name="salutation"
                                            value={data?.salutation}
                                            onChange={(e) => editChange(e)}
                                            margin="dense"
                                        >
                                            {
                                                gender2?.map((sal) => (
                                                    <MenuItem value={sal}> {sal} </MenuItem>
                                                ))
                                            }
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={8} md={6} lg={4}>
                                        <TextField
                                            select
                                            label="Gender"
                                            className="formtext"
                                            placeholder="Gender"
                                            fullWidth
                                            name="gender"
                                            value={data?.gender}
                                            onChange={(e) => editChange(e)}
                                            variant="outlined"
                                            margin="dense"
                                        >
                                            {
                                                gender1?.map((gender) => (
                                                    <MenuItem value={gender}> {gender} </MenuItem>
                                                ))
                                            }
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={8} md={6} lg={4}>
                                        <TextField
                                            select
                                            label="Marrital Status"
                                            className="formtext"
                                            placeholder="Marrital Status"
                                            fullWidth
                                            variant="outlined"
                                            name="marritalStatus"
                                            value={data?.marritalStatus}
                                            onChange={(e) => editChange(e)}
                                            margin="dense"
                                        >
                                            {
                                                relationship?.map((relationship) => (
                                                    <MenuItem value={relationship}> {relationship} </MenuItem>
                                                ))
                                            }
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={8} md={6} lg={4}>
                                        <TextField
                                            type="number"
                                            label="Mobile Number"
                                            className="formtext"
                                            placeholder="Mobile Number"
                                            fullWidth
                                            variant="outlined"
                                            name="mobileNumber"
                                            value={data?.mobileNumber}
                                            onChange={(e) => editChange(e) }
                                            margin="dense"
                                        />
                                    </Grid>
                                    <Grid item xs={8} md={6} lg={4}>
                                        <TextField
                                            type="number"
                                            label="Postal Code"
                                            className="formtext"
                                            placeholder="Postal Code"
                                            fullWidth
                                            variant="outlined"
                                            name="postalCode"
                                            value={data?.postalCode}
                                            onChange={(e) => editChange(e) }
                                            margin="dense"
                                        />
                                    </Grid>
                                    <Grid item xs={8} md={6} lg={4}>
                                        <TextField
                                            label="Country"
                                            className="formtext"
                                            placeholder="Country"
                                            fullWidth
                                            variant="outlined"
                                            name="country"
                                            value={data?.country}
                                            onChange={(e) => editChange(e) }
                                            margin="dense"
                                        />
                                    </Grid>
                                    <Grid item xs={8} md={6} lg={4}>
                                        <TextField
                                            label="Nationality"
                                            className="formtext"
                                            placeholder="Nationality"
                                            fullWidth
                                            name="nationality"
                                            value={data?.nationality}
                                            onChange={(e) => editChange(e)}
                                            variant="outlined"
                                            margin="dense"
                                        />
                                    </Grid>
                                    <Grid item xs={8} md={6} lg={4}>
                                        <FormControl
                                            style={{ marginTop: "0.5rem" }}
                                            className="formtext"
                                            fullWidth
                                        >
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <DatePicker
                                                    inputFormat="dd-MM-yyyy"
                                                    label="Birth Date"
                                                    placeholder="Birth Date"
                                                    fullWidth
                                                    name="birthDate"
                                                    id="birthDate"
                                                    value={data?.birthDate}
                                                    onChange={(date) => datebirthchange(date)}
                                                    renderInput={(params) => <TextField {...params} />}
                                                />
                                            </LocalizationProvider>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={8} md={6} lg={4}>
                                        <FormControlLabel
                                            fullWidth
                                            className="checktext"
                                            control={<Checkbox lable="Company Doctor:" checked={data?.companyDoctor}   />}
                                            label="Company Doctor:"
                                        />
                                    </Grid>

                                    <Grid item xs={8} md={6} lg={4}>
                                        <TextField
                                            label="Birth Place"
                                            className="formtext"
                                            placeholder="Birth Place"
                                            fullWidth
                                            name="birthPlace"
                                            value={data?.birthPlace}
                                            onChange={(e) => editChange(e)}
                                            variant="outlined"
                                            margin="dense"
                                        />
                                    </Grid>
                                    <Grid item xs={8} md={6} lg={4}>
                                        <TextField
                                            label="Language"
                                            className="formtext"
                                            placeholder="Language"
                                            fullWidth
                                            variant="outlined"
                                            name="language"
                                            value={data?.language}
                                            onChange={(e) => editChange(e)}
                                            margin="dense"
                                        />
                                    </Grid>
                                    <Grid item xs={8} md={6} lg={4}>
                                        <TextField
                                            label="Category"
                                            className="formtext"
                                            placeholder="Category"
                                            fullWidth
                                            variant="outlined"
                                            name="category"
                                            value={data?.category}
                                            onChange={(e) => editChange(e)}
                                            margin="dense"
                                        />
                                    </Grid>
                                    <Grid item xs={8} md={6} lg={4}>
                                        <TextField
                                            select
                                            label="Occupation"
                                            className="formtext"
                                            placeholder="Occupation"
                                            fullWidth
                                            variant="outlined"
                                            name="occupation"
                                            value={data?.occupation}
                                            onChange={(e) => editChange(e) }
                                            margin="dense"
                                        >
                                            {
                                                work?.map((wk) => (
                                                    <MenuItem value={wk}> {wk} </MenuItem>
                                                ))
                                            }

                                        </TextField>
                                    </Grid>
                                    <Grid item xs={8} md={6} lg={4} style={{ display: "flex" }}>
                                        <TextField
                                            select
                                            label="Address"
                                            labelId="demo-simple-select-label"
                                            className="formtext"
                                            placeholder="Address"
                                            fullWidth
                                            name="addressid"
                                            value={data?.address?.id}
                                            onChange={(e) => editChange(e)}
                                            variant="outlined"
                                            margin="dense"
                                        >
                                            {
                                                address?.map((address) => (
                                                    <MenuItem value={address.id}> {address.id} - {address.toAddress} </MenuItem>
                                                ))
                                            }
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={8} md={6} lg={4}>
                                        <Button
                                            style={{ marginTop: "1rem" }}
                                            variant="contained"
                                            color="error"
                                            startIcon={<AddCircleIcon />}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid item xs={8} md={6} lg={4} style={{display:"flex"}}>
                                        <TextField
                                            select
                                            label="Bank Account"
                                            labelId="demo-simple-select-label"
                                            className="formtext"
                                            placeholder="Bank Account"
                                            fullWidth
                                            name="bankId"
                                            value={data?.bankAccount?.id}
                                            onChange={(e) => editChange(e)}
                                            variant="outlined"
                                            margin="dense"
                                        >
                                            {
                                                bankAccount.map((bank) => (
                                                    <MenuItem value={bank.id}> {bank.id} - {bank.accountHolderName} </MenuItem>
                                                ))
                                            }
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={8} md={6} lg={4}>
                                        <Button
                                            style={{ marginTop: "1rem" }}
                                            variant="contained"
                                            color="error"
                                            startIcon={<AddCircleIcon />}
                                        />
                                    </Grid> </Grid>
                                <Grid container spacing={2}>

                                </Grid>
                            </Box>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={close} color="error" variant="contained">
                            Cancel
                        </Button>
                        <Button color="primary" variant="contained" onClick={(e) => updateClient(data.id)}>
                            {"Submit"}
                        </Button>
                    </DialogActions>
                </>
            </Dialog>
        </div>
    );
}
export default ClientDetailsEdit;
