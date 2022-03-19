import React, {useState} from 'react';
import {Modal} from "react-bootstrap";
import InsuranceApi from "../../Service/InsuranceApi";
import {Box, FormControl, Grid, MenuItem, TextField} from "@mui/material";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import FormControlLabel from "@mui/material/FormControlLabel";
import {Checkbox} from "@material-ui/core";
import moment from "moment";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";
import ClientDetailsAdd from "../Client/ClientDetailsAdd";

const AgentAdd = ({
    close, getall, clients, setClients, agenttype,employees, paymethod
                  }) => {



    const [clientId, setClientId] = useState("");
    const [dateappointed, setDateappointed] = useState("");
    const [exclusive, setExclusive] = useState("");
    const [previousAgent, setPreviousAgent] = useState(false);
    const [prevdateoftermination, setPrevdateoftermination] = useState("");
    const [distributionChannel, setDistributionChannel] = useState("");
    const [branch, setBranch] = useState("");
    const [areaCode, setAreaCode] = useState("");
    const [agentType, setAgentType] = useState("");
    const [reportingTo, setReportingTo] = useState("");
    const [payMethod, setPayMethod] = useState("");
    const [payFrequency, setPayFrequency] = useState("");
    const [currencyType, setCurrencyType] = useState("");
    const [minimumAmount, setMinimumAmount] = useState("");
    const [bonusAllocation, setBonusAllocation] = useState("");
    const [basicCommission, setBasicCommission] = useState("");
    const [renewalCommission, setRenewalCommission] = useState("");
    const [servicingCommission, setServicingCommission] = useState("");
    const [commissionClass, setCommissionClass] = useState("");



    function toggle(value){
        return !value;
    }

    const saveAgent = () => {

        const dateAppointed = moment(dateappointed).format("MM-DD-YYYY")
        const prevDateOfTermination  = moment(prevdateoftermination).format("MM-DD-YYYY")

        const agent = {clientId, dateAppointed, exclusive, previousAgent, prevDateOfTermination, distributionChannel
        , branch, areaCode, agentType, reportingTo, payMethod, payFrequency, currencyType, minimumAmount, bonusAllocation,
            basicCommission, renewalCommission, servicingCommission, commissionClass} ;


        InsuranceApi.saveAgent(agent).then((res) => {
            console.log(res.data)
            getall();
            close();
        }).catch((err) => {console.log(err)})
    }

    const [clientmodal, setClientmodal] = useState(false);
    const clientOpen = () => {
        setClientmodal(true)
    }
    const clientClose = () => {
        InsuranceApi.getAllClients().then((res)=> {
            setClients(res.data)
        }).catch((err) => {console.log(err)})
        setClientmodal(false)
    }

    return (
        <div>
            <br/>
            <form autoComplete="off">
                <Box sx={{flexGrow: 1}}>
                    <Grid container spacing={2}>
                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                select
                                label="Client"
                                className="formtext"
                                placeholder="Client ID"
                                fullWidth
                                onChange={(e) => setClientId(e.target.value)}
                                variant="outlined"
                                margin="dense"
                            >
                                {
                                    clients.map((client) => (
                                        <MenuItem value={client.id}> {client.givenName}{client.surName} - {client.id} </MenuItem>
                                    ))
                                }
                            </TextField>
                        </Grid>
                        <Grid item xs={8} md={6} lg={4}>
                            <Button
                                style={{ marginTop: "1rem", marginLeft:20 }}
                                variant="contained"
                                color="error"
                                onClick={() => clientOpen()}
                                startIcon={<AddCircleIcon />}
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
                                        inputFormat="dd/MM/yyyy"
                                        label="Appointed Date"
                                        placeholder="Appointed Date"
                                        fullWidth
                                        name={dateappointed}
                                        value={dateappointed}
                                        onChange={(date) => setDateappointed(date)}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </FormControl>
                        </Grid>
                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                label="Exclusive"
                                className="formtext"
                                placeholder="Exclusive"
                                fullWidth
                                variant="outlined"
                                onChange={(e) => setExclusive(e.target.value) }
                                margin="dense"
                            />
                        </Grid>
                        <Grid item xs={8} md={6} lg={4}>
                            <FormControlLabel
                                fullWidth
                                className="checktext"
                                control={<Checkbox lable="Previous Agent:" onChange={(e) => setPreviousAgent(toggle)} />}
                                label="Previous Agent : "
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
                                        inputFormat="dd/MM/yyyy"
                                        label="Previous Date of Termination"
                                        placeholder="Previous Date of Termination"
                                        fullWidth
                                        name={prevdateoftermination}
                                        value={prevdateoftermination}
                                        onChange={(date) => setPrevdateoftermination(date) }
                                            renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </FormControl>
                        </Grid>
                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                label="Distribution Channel"
                                className="formtext"
                                placeholder="Distribution Channel"
                                fullWidth
                                variant="outlined"
                                onChange={(e) => setDistributionChannel(e.target.value) }
                                margin="dense"
                            />
                        </Grid>
                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                label="Branch"
                                className="formtext"
                                placeholder="Branch"
                                fullWidth
                                variant="outlined"
                                onChange={(e) => setBranch(e.target.value) }
                                margin="dense"
                            />
                        </Grid>
                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                label="Area Code"
                                className="formtext"
                                placeholder="Area Code"
                                fullWidth
                                variant="outlined"
                                onChange={(e) => setAreaCode(e.target.value) }
                                margin="dense"
                            />
                        </Grid>
                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                select
                                label="Agent Type"
                                className="formtext"
                                placeholder="Agent Type"
                                fullWidth
                                variant="outlined"
                                onChange={(e) => setAgentType(e.target.value) }
                                margin="dense"
                            >
                                {
                                    agenttype.map((type) => (
                                        <MenuItem value={type}> {type} </MenuItem>
                                    ))
                                }
                            </TextField>
                        </Grid>
                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                select
                                label="Reporting To"
                                className="formtext"
                                placeholder="Reporting To"
                                fullWidth
                                variant="outlined"
                                onChange={(e) => setReportingTo(e.target.value) }
                                margin="dense"
                            >
                                {
                                    employees.map((emp) => (
                                        <MenuItem value={emp.employeeName}> {emp.employeeName} </MenuItem>
                                    ))
                                }
                            </TextField>
                        </Grid>
                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                select
                                label="Pay Method"
                                className="formtext"
                                placeholder="Pay Method"
                                fullWidth
                                variant="outlined"
                                onChange={(e) => setPayMethod(e.target.value) }
                                margin="dense"
                            >
                                {
                                    paymethod.map((pay) => (
                                        <MenuItem value={pay}> {pay} </MenuItem>
                                    ))
                                }
                            </TextField>
                        </Grid>
                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                label="Pay Frequency"
                                className="formtext"
                                placeholder="Pay Frequency"
                                fullWidth
                                variant="outlined"
                                onChange={(e) => setPayFrequency(e.target.value) }
                                margin="dense"
                            />
                        </Grid>
                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                label="Currency Type"
                                className="formtext"
                                placeholder="Currency Type"
                                fullWidth
                                variant="outlined"
                                onChange={(e) => setCurrencyType(e.target.value) }
                                margin="dense"
                            />
                        </Grid>
                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                type="number"
                                label="Minimum Amount"
                                className="formtext"
                                placeholder="Minimum Amount"
                                fullWidth
                                variant="outlined"
                                onChange={(e) => setMinimumAmount(e.target.value) }
                                margin="dense"
                            />
                        </Grid>
                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                label="Bonus Allocation"
                                className="formtext"
                                placeholder="Bonus Allocation "
                                fullWidth
                                variant="outlined"
                                onChange={(e) => setBonusAllocation(e.target.value) }
                                margin="dense"
                            />
                        </Grid>
                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                label="Basic Commission"
                                className="formtext"
                                placeholder="Basic Commission"
                                fullWidth
                                variant="outlined"
                                onChange={(e) => setBasicCommission(e.target.value) }
                                margin="dense"
                            />
                        </Grid>
                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                label="Servicing Commission"
                                className="formtext"
                                placeholder="Servicing Commission"
                                fullWidth
                                variant="outlined"
                                onChange={(e) => setServicingCommission(e.target.value) }
                                margin="dense"
                            />
                        </Grid>
                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                label=" Commission Class"
                                className="formtext"
                                placeholder=" Commission Class "
                                fullWidth
                                variant="outlined"
                                onChange={(e) => setCommissionClass(e.target.value) }
                                margin="dense"
                            />
                        </Grid>
                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                label="Renewal Commission"
                                className="formtext"
                                placeholder="Renewal Commission"
                                fullWidth
                                variant="outlined"
                                onChange={(e) => setRenewalCommission(e.target.value) }
                                margin="dense"
                            />
                        </Grid>
                    </Grid>
                </Box>
            </form>
            <br/>
            <div>
                <Button
                    color="primary"
                    variant="contained"
                    style={{marginRight: 10}}
                    onClick={() => saveAgent()}> Submit </Button>

                        <Button
                            color="error"
                            variant="contained"
                            onClick={() => close()}> Cancel </Button>
            </div>

            <Modal
                show={clientmodal}
                onHide={clientClose}
                centered
                size="lg"
            >
                <Modal.Header closeButton> <Modal.Title> Client Add </Modal.Title> </Modal.Header>
                <Modal.Body>
                    <ClientDetailsAdd clientclose={clientClose}/>
                </Modal.Body>

            </Modal>


        </div>
    );
};

export default AgentAdd;
