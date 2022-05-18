import React, {useEffect, useState} from "react";
import InsuranceApi from "../../Service/InsuranceApi";
import { Box, FormControl, Grid, MenuItem, TextField } from "@mui/material";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Checkbox } from "@material-ui/core";
import Button from "@mui/material/Button";
import moment from "moment";

const AgentEdit = ({ record, setRecord, getAll, close,clients, agenttype,employees, paymethod, Offices }) => {
    let {
        id,
        clientId,
        upLevelAgentId,
        dateAppointed,
        exclusive,
        previousAgent,
        prevDateOfTermination,
        distributionChannel,
        officeId,
        areaCode,
        agentType,
        payMethod,
        payFrequency,
        currencyType,
        minimumAmount,
        bonusAllocation,
        basicCommission,
        renewalCommission,
        servicingCommission,
        commissionClass,
    } = record;



    const editChange = (e) => {
        const { name, value } = e.target;
        setRecord({ ...record, [name]: value });
    };

    const editCheck = (e) => {
        const { checked, name } = e.target;

        setRecord({ ...record, [name]: checked });
    }

    const editDateAppointed = (date) => {
        setRecord({ ...record, dateAppointed: date });
    };
    const editPrevDateDetermination = (date) => {
        setRecord({ ...record, prevDateOfTermination: date });
    };


    const [Agents, setAgents] = useState([]);
    useEffect(() => {
       InsuranceApi.getAgents(sessionStorage.getItem("userid")).then((res) => {
           setAgents(res.data)
       }).catch(err => console.log(err))
    }, []);



    const officeChange = (val) => {
        InsuranceApi.getAgentsByOffice(val).then((res) => {
            setAgents(res.data)
        }).catch(err => console.log(err))
    }

    const updateAgent = (id) => {

        if(previousAgent === true){
            const body = {
                clientId : record.clientId,
                dateAppointed: moment(record.dateAppointed).format("MM-DD-YYYY"),
                exclusive: record.exclusive,
                previousAgent: record.previousAgent,
                prevDateOfTermination: moment(record.prevDateOfTermination).format("MM-DD-YYYY"),
                distributionChannel: record.distributionChannel,
                officeId:  record.officeId,
                areaCode:  record.areaCode,
                agentType:  record.agentType,
                upLevelAgentId:  record.upLevelAgentId,
                payMethod:  record.payMethod,
                payFrequency:  record.payFrequency,
                currencyType:  record.currencyType,
                minimumAmount:  record.minimumAmount,
                bonusAllocation:  record.bonusAllocation,
                basicCommission:  record.basicCommission,
                renewalCommission:  record.renewalCommission,
                servicingCommission:  record.servicingCommission,
                commissionClass:  record.commissionClass,
            }
            InsuranceApi.updateAgent(id, body).then((res) => {
                getAll();
                close();
            }).catch((err) => {console.log(err)})
        }
        else{
            const body = {
                clientId : record.clientId,
                dateAppointed: moment(record.dateAppointed).format("MM-DD-YYYY"),
                exclusive: record.exclusive,
                previousAgent: record.previousAgent,
                distributionChannel: record.distributionChannel,
                officeId:  record.officeId,
                areaCode:  record.areaCode,
                agentType:  record.agentType,
                upLevelAgentId:  record.upLevelAgentId,
                payMethod:  record.payMethod,
                payFrequency:  record.payFrequency,
                currencyType:  record.currencyType,
                minimumAmount:  record.minimumAmount,
                bonusAllocation:  record.bonusAllocation,
                basicCommission:  record.basicCommission,
                renewalCommission:  record.renewalCommission,
                servicingCommission:  record.servicingCommission,
                commissionClass:  record.commissionClass,
            }
            InsuranceApi.updateAgent(id, body).then((res) => {
                getAll();
                close();
            }).catch((err) => {console.log(err)})

        }
    }

    return (
        <div>
            <br />
            <form autoComplete="off">
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                select
                                name="clientId"
                                value={clientId}
                                label="Client"
                                className="formtext"
                                placeholder="Client ID"
                                fullWidth
                                onChange={(e) => editChange(e)}
                                variant="outlined"
                                margin="dense"
                            >
                                {clients.map((client) => (
                                    <MenuItem value={client.id}>
                                        {client.givenName} {client.surName} - {client.id}
                                    </MenuItem>
                                ))}
                            </TextField>
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
                                        name="dateappointed"
                                        value={dateAppointed}
                                        onChange={(date) => editDateAppointed(date)}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </FormControl>
                        </Grid>
                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                name="exclusive"
                                value={exclusive}
                                label="Exclusive"
                                className="formtext"
                                placeholder="Exclusive"
                                fullWidth
                                variant="outlined"
                                onChange={(e) => editChange(e)}
                                margin="dense"
                            />
                        </Grid>
                        <Grid item xs={8} md={6} lg={4}>
                            <FormControlLabel
                                fullWidth
                                className="checktext"
                                onChange={(e) => editCheck(e) }
                                control={
                                    <Checkbox
                                        name="previousAgent"
                                        value={previousAgent}
                                        checked={previousAgent === true ? true : false}
                                        onChange={(e) => editCheck(e) }
                                        lable="Previous Agent:"
                                    />
                                }
                                label="Previous Agent : "
                            />
                        </Grid>
                        {
                            previousAgent === true ?

                            <Grid item xs={8} md={6} lg={4}>
                            <FormControl
                                style={{marginTop: "0.5rem"}}
                                className="formtext"
                                fullWidth
                            >
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        inputFormat="dd/MM/yyyy"
                                        label="Previous Date of Termination"
                                        placeholder="Previous Date of Termination"
                                        fullWidth
                                        name="prevdateoftermination"
                                        value={prevDateOfTermination}
                                        onChange={(date) => editPrevDateDetermination(date)}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </FormControl>
                        </Grid>

                            :

                            <Grid item xs={8} md={6} lg={4}>
                            <FormControl
                            style={{marginTop: "0.5rem"}}
                            className="formtext"
                            fullWidth
                            >
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                            inputFormat="dd/MM/yyyy"
                            label="Previous Date of Termination"
                            placeholder="Previous Date of Termination"
                            fullWidth
                            name="prevdateoftermination"
                            disabled
                            value={prevDateOfTermination}
                            onChange={(date) => editPrevDateDetermination(date)}
                            renderInput={(params) => <TextField {...params} />}
                            />
                            </LocalizationProvider>
                            </FormControl>
                            </Grid>
                        }

                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                name="distributionChannel"
                                value={distributionChannel}
                                label="Distribution Channel"
                                className="formtext"
                                placeholder="Distribution Channel"
                                fullWidth
                                variant="outlined"
                                onChange={(e) => editChange(e)}
                                margin="dense"
                            />
                        </Grid>
                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                name="officeId"
                                select
                                value={officeId}
                                label="Office"
                                className="formtext"
                                placeholder="Enter agent's office"
                                fullWidth
                                variant="outlined"
                                onChange={(e) => {officeChange(e.target.value); editChange(e)}}
                                margin="dense"
                            >
                                {
                                    Offices.map((value, index) => (
                                        <MenuItem value={value.officeId}> {value.officeName} - {value?.company?.companyName} </MenuItem>
                                    ))
                                }
                            </TextField>
                        </Grid>

                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                select
                                label="Reporting To"
                                name="upLevelAgentId"
                                className="formtext"
                                placeholder="Up Level Agent ID"
                                fullWidth
                                value={upLevelAgentId}
                                variant="outlined"
                                onChange={(e) => editChange(e) }
                                margin="dense"
                            >
                                <MenuItem value={0}> --NULL-- </MenuItem>
                                {
                                    Agents.map((value) => (
                                        <MenuItem value={value.id}> {value.client?.givenName} {value.client?.surName} </MenuItem>
                                    ))
                                }
                            </TextField>
                        </Grid>

                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                name="areaCode"
                                value={areaCode}
                                label="Area Code"
                                className="formtext"
                                placeholder="Area Code"
                                fullWidth
                                variant="outlined"
                                onChange={(e) => editChange(e)}
                                margin="dense"
                            />
                        </Grid>
                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                select
                                name="agentType"
                                value={agentType}
                                label="Agent Type"
                                className="formtext"
                                placeholder="Agent Type"
                                fullWidth
                                variant="outlined"
                                onChange={(e) => editChange(e)}
                                margin="dense"
                            >
                                {
                                    agenttype.map((type) => (
                                        <MenuItem value={type.id}> {type.agentLevelDesc} - {type.agentLevelId} </MenuItem>
                                    ))
                                }
                            </TextField>
                        </Grid>
                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                select
                                name="payMethod"
                                value={payMethod}
                                label="Pay Method"
                                className="formtext"
                                placeholder="Pay Method"
                                fullWidth
                                variant="outlined"
                                onChange={(e) => editChange(e)}
                                margin="dense"
                            >
                                {paymethod.map((pay) => (
                                    <MenuItem value={pay}> {pay} </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                name="payFrequency"
                                value={payFrequency}
                                label="Pay Frequency"
                                className="formtext"
                                placeholder="Pay Frequency"
                                fullWidth
                                variant="outlined"
                                onChange={(e) => editChange(e)}
                                margin="dense"
                            />
                        </Grid>
                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                name="currencyType"
                                value={currencyType}
                                label="Currency Type"
                                className="formtext"
                                placeholder="Currency Type"
                                fullWidth
                                variant="outlined"
                                onChange={(e) => editChange(e)}
                                margin="dense"
                            />
                        </Grid>
                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                type="number"
                                name="minimumAmount"
                                value={minimumAmount}
                                label="Minimum Amount"
                                className="formtext"
                                placeholder="Minimum Amount"
                                fullWidth
                                variant="outlined"
                                onChange={(e) => editChange(e)}
                                margin="dense"
                            />
                        </Grid>
                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                name="bonusAllocation"
                                value={bonusAllocation}
                                label="Bonus Allocation"
                                className="formtext"
                                placeholder="Bonus Allocation "
                                fullWidth
                                variant="outlined"
                                onChange={(e) => editChange(e)}
                                margin="dense"
                            />
                        </Grid>
                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                name="basicCommission"
                                value={basicCommission}
                                label="Basic Commission"
                                className="formtext"
                                placeholder="Basic Commission"
                                fullWidth
                                variant="outlined"
                                onChange={(e) => editChange(e)}
                                margin="dense"
                            />
                        </Grid>
                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                name="renewalCommission"
                                value={renewalCommission}
                                label="Servicing Commission"
                                className="formtext"
                                placeholder="Servicing Commission"
                                fullWidthcommissionClass
                                variant="outlined"
                                onChange={(e) => editChange(e)}
                                margin="dense"
                            />
                        </Grid>
                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                name="commissionClass"
                                value={commissionClass}
                                label=" Commission Class"
                                className="formtext"
                                placeholder=" Commission Class "
                                fullWidth
                                variant="outlined"
                                onChange={(e) => editChange(e)}
                                margin="dense"
                            />
                        </Grid>
                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                name="servicingCommission"
                                value={servicingCommission}
                                label="Renewal Commission"
                                className="formtext"
                                placeholder="Renewal Commission"
                                fullWidth
                                variant="outlined"
                                onChange={(e) => editChange(e)}
                                margin="dense"
                            />
                        </Grid>
                    </Grid>
                </Box>
            </form>
            <br />
            <div>
                <Button
                    color="primary"
                    variant="contained"
                    style={{ marginRight: 10 }}
                    onClick={() => updateAgent(id)}
                >
                    Submit
                </Button>

                <Button color="error" variant="contained" onClick={() => close()}>
                    Cancel
                </Button>
            </div>
        </div>
    );
};

export default AgentEdit;
