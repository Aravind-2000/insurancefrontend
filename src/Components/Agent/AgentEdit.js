import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import InsuranceApi from "../../Service/InsuranceApi";
import { Box, FormControl, Grid, MenuItem, TextField } from "@mui/material";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Checkbox } from "@material-ui/core";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";
import moment from "moment";

const AgentEdit = ({ record, setRecord, getAll, close,clients, agenttype,employees, paymethod }) => {
    let {
        id,
        client,
        dateAppointed,
        exclusive,
        previousAgent,
        prevDateOfTermination,
        distributionChannel,
        branch,
        areaCode,
        agentType,
        reportingTo,
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

    const editDateAppointed = (date) => {
        setRecord({ ...record, dateAppointed: date });
    };
    const editPrevDateDetermination = (date) => {
        setRecord({ ...record, prevDateOfTermination: date });
    };

    const updateAgent = (id) => {

        const body = {

            clientId : record.clientId,
            dateAppointed: moment(record.dateAppointed).format("MM-DD-YYYY"),
            exclusive: record.exclusive,
            previousAgent: record.previousAgent,
            prevDateOfTermination: moment(record.prevDateOfTermination).format("MM-DD-YYYY"),
            distributionChannel: record.distributionChannel,
            branch:  record.branch,
            areaCode:  record.areaCode,
            agentType:  record.agentType,
            reportingTo:  record.reportingTo,
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
                                value={client?.id}
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
                                control={
                                    <Checkbox
                                        name="previousAgent"
                                        value={previousAgent}
                                        lable="Previous Agent:"
                                    />
                                }
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
                                        name="prevdateoftermination"
                                        value={prevDateOfTermination}
                                        onChange={(date) => editPrevDateDetermination(date)}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </FormControl>
                        </Grid>
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
                                name="branch"
                                value={branch}
                                label="Branch"
                                className="formtext"
                                placeholder="Branch"
                                fullWidth
                                variant="outlined"
                                onChange={(e) => editChange(e)}
                                margin="dense"
                            />
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
                                        <MenuItem value={type}> {type} </MenuItem>
                                    ))
                                }
                            </TextField>
                        </Grid>
                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                select
                                name="reportingTo"
                                value={reportingTo}
                                label="Reporting To"
                                className="formtext"
                                placeholder="Reporting To"
                                fullWidth
                                variant="outlined"
                                onChange={(e) => editChange(e)}
                                margin="dense"
                            >
                                {employees.map((emp) => (
                                    <MenuItem value={emp.employeeName}>
                                        {" "}
                                        {emp.employeeName}{" "}
                                    </MenuItem>
                                ))}
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
                    {" "}
                    Submit{" "}
                </Button>

                <Button color="error" variant="contained" onClick={() => close()}>
                    {" "}
                    Cancel{" "}
                </Button>
            </div>
        </div>
    );
};

export default AgentEdit;
