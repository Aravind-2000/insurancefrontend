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
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Button from "@mui/material/Button";
import ClientDetailsAdd from "../Client/ClientDetailsAdd";
import Draggable from "react-draggable";
import DraggableComponent from "../../Service/DraggableComponent";

const AgentAdd = ({
    close, getall, clients, setClients, agenttype, employees, paymethod, Offices, Currency, Paying, Invalid, Exclusives
                  }) => {



    const [clientId, setClientId] = useState("");
    const [dateappointed, setDateappointed] = useState("");
    const [exclusive, setExclusive] = useState("");
    const [previousAgent, setPreviousAgent] = useState(false);
    const [prevdateoftermination, setPrevdateoftermination] = useState("");
    const [previousId, setPreviousId] = useState("");
    const [distributionChannel, setDistributionChannel] = useState("");
    const [areaCode, setAreaCode] = useState("");
    const [agentType, setAgentType] = useState("");
    const [upLevelAgentId, setUpLevelAgentId] = useState("");
    const [payMethod, setPayMethod] = useState("");
    const [payFrequency, setPayFrequency] = useState("");
    const [currencyType, setCurrencyType] = useState("");
    const [minimumAmount, setMinimumAmount] = useState("");
    const [bonusAllocation, setBonusAllocation] = useState("");
    const [basicCommission, setBasicCommission] = useState("");
    const [renewalCommission, setRenewalCommission] = useState("");
    const [servicingCommission, setServicingCommission] = useState("");
    const [commissionClass, setCommissionClass] = useState("");
    const [officeId, setOfficeId] = useState("");


    function toggle(value){
        return !value;
    }

    const saveAgent = () => {

        const dateAppointed = moment(dateappointed).format("MM-DD-YYYY")
        const prevDateOfTermination  = moment(prevdateoftermination).format("MM-DD-YYYY")

        if(previousAgent === true){
             const agent = {clientId, dateAppointed, exclusive, previousAgent, prevDateOfTermination,previousId, distributionChannel
                , areaCode, agentType, upLevelAgentId,officeId, payMethod, payFrequency, currencyType, minimumAmount, bonusAllocation,
                basicCommission, renewalCommission, servicingCommission, commissionClass} ;

            InsuranceApi.saveAgent(agent).then((res) => {
                console.log(res.data)
                getall();
                close();
            }).catch((err) => {console.log(err)})
        }
        else{
            const agent = {clientId, dateAppointed, exclusive, previousAgent, distributionChannel
                ,areaCode, agentType, upLevelAgentId, officeId, payMethod, payFrequency, currencyType, minimumAmount, bonusAllocation,
                basicCommission, renewalCommission, servicingCommission, commissionClass} ;

            InsuranceApi.saveAgent(agent, sessionStorage.getItem("userid")).then((res) => {
                console.log(res.data)
                getall();
                close();
            }).catch((err) => {console.log(err)})
        }

    }

    const [clientmodal, setClientmodal] = useState(false);

    const access = JSON.parse(sessionStorage.getItem("specialaccess"))
    const clientOpen = () => {

        if(access.find(element => element === "add-client")){
            setClientmodal(true)
        }
        else{
            window.alert("UNAUTHORIZED")
        }
    }
    const clientClose = () => {
        InsuranceApi.getAllClients(sessionStorage.getItem("userid")).then((res)=> {
            setClients(res.data)
        }).catch((err) => {console.log(err)})
        setClientmodal(false)
    }

    //Parts of Form
    const [previousDetails, setPreviousDetails] = useState(false);
    const [previousCount, setPreviousCount] = useState(1);
    const showPrevious = () => {
        if(previousCount % 2 !== 0){
            setPreviousDetails(true)
            setPreviousCount(previousCount + 1)
        }
        else{
            setPreviousDetails(false)
            setPreviousCount(previousCount + 1)
        }
    }

    const [commissionDetails, setCommissionDetails] = useState(false);
    const [commissionCount, setCommissionCount] = useState(1);
    const showCommission = () => {
        if(commissionCount % 2 !== 0){
            setCommissionDetails(true)
            setCommissionCount(commissionCount + 1)
        }
        else{
            setCommissionDetails(false)
            setCommissionCount(commissionCount + 1)
        }
    }

    const [pay, setPay] = useState(false);
    const [payCount, setPayCount] = useState(1);
    const showPay = () => {
        if(payCount % 2 !== 0){
            setPay(true)
            setPayCount(payCount + 1)
        }
        else{
            setPay(false)
            setPayCount(payCount + 1)
        }
    }

    const [personal, setPersonal] = useState(false);
    const [personalCount, setPersonalCount] = useState(1);
    const showPersonal = () => {
        if(personalCount % 2 !== 0){
            setPersonal(true)
            setPersonalCount(personalCount + 1)
        }
        else{
            setPersonal(false)
            setPersonalCount(personalCount + 1)
        }
    }

    const [clientDetails, setClientDetails] = useState(false);
    const [clientCount, setClientCount] = useState(1);
    const showClient = () => {
        if(clientCount % 2 !== 0){
            setClientDetails(true)
            setClientCount(clientCount + 1)
        }
        else{
            setClientDetails(false)
            setClientCount(clientCount + 1)
        }
    }

    const [Agents, setAgents] = useState([]);
    const officeChange = (val) => {
        InsuranceApi.getAgentsByOffice(val).then((res) => {
            setAgents(res.data)
        }).catch(err => console.log(err))
        setOfficeId(val);
    }



    return (
        <div>
            <br/>
            <form autoComplete="off" >
                <Box sx={{flexGrow: 1}}>
                    <Grid container spacing={2}>
                        <Grid container spacing={2}>
                            <Grid item xs={8} md={6} lg={4}>
                                <div className="TableClass">
                                    <h4 style={{marginRight:10}}> Client Details </h4>
                                    {
                                        clientCount % 2 === 0 ?
                                            <RemoveCircleIcon
                                                style={{color:"blue", cursor:"pointer", marginTop:2}}
                                                onClick={() => showClient()}
                                            />
                                            : <AddCircleIcon
                                                style={{color:"blue", cursor:"pointer", marginTop:2}}
                                                onClick={() => showClient()}
                                            />}
                                </div>
                            </Grid>
                        </Grid>
                        <br/>
                        <>
                            {
                                clientDetails === true ?  <Grid container spacing={2}>
                                    <Grid item xs={8} md={6} lg={4}>
                                        <TextField
                                            select
                                            fullWidth
                                            className="formtext"
                                            margin="dense"
                                            variant="outlined"
                                            placeholder="Client ID"
                                            value={clientId}
                                            label="Client "
                                            onChange={(e) => setClientId(e.target.value)}
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
                                            select
                                            label="Exclusive"
                                            className="formtext"
                                            placeholder="Exclusive"
                                            fullWidth
                                            value={exclusive}
                                            variant="outlined"
                                            onChange={(e) => setExclusive(e.target.value) }
                                            margin="dense"
                                        >
                                            {
                                                Exclusives.map((val) => (
                                                    <MenuItem value={val}> {val} </MenuItem>
                                                ))
                                            }
                                        </TextField>
                                    </Grid>
                                </Grid>
                                    : null
                            }
                        </>

                        <br/>
                        {/*Previous Details */}
                        <div className="TableClass">
                            <h4 style={{marginRight:10}}> Previous Agent Details </h4>
                                {
                                    previousCount % 2 === 0 ?
                                    <RemoveCircleIcon
                                        style={{color:"blue", cursor:"pointer", marginTop:2}}
                                        onClick={() => showPrevious()}
                                    />
                                     : <AddCircleIcon
                                            style={{color:"blue", cursor:"pointer", marginTop:2}}
                                            onClick={() => showPrevious()}
                                        />}
                        </div>
                        <br/>
                        <>
                            {
                                previousDetails === true ?
                                    <Grid container spacing={2}>
                                    <Grid item xs={8} md={6} lg={4}>
                                        <FormControlLabel
                                            fullWidth
                                            className="checktext"
                                            control={<Checkbox lable="Previous Agent:" onChange={(e) => setPreviousAgent(toggle)} />}
                                            label="Previous Agent : "
                                        />
                                    </Grid>
                                    {
                                        previousAgent === true ?
                                            <>
                                                <Grid item xs={8} md={6} lg={4}>
                                                    <TextField
                                                        select
                                                        label="Previous ID"
                                                        className="formtext"
                                                        placeholder="ID"
                                                        fullWidth
                                                        value={previousId}
                                                        variant="outlined"
                                                        onChange={(e) => setPreviousId(e.target.value) }
                                                        margin="dense"
                                                    >
                                                        {
                                                            Invalid.map((value, index) => (
                                                                <MenuItem value={value.id}> {value?.client?.givenName} {value?.client?.surName} - {value.id} </MenuItem>
                                                            ))
                                                        }

                                                    </TextField>
                                                </Grid>
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
                                                                name={prevdateoftermination}
                                                                id="prevdateoftermination"
                                                                value={prevdateoftermination}
                                                                onChange={(date) => setPrevdateoftermination(date)}
                                                                renderInput={(params) => <TextField {...params} />}
                                                            />
                                                        </LocalizationProvider>
                                                    </FormControl>
                                                </Grid>
                                            </>
                                            :
                                            <>
                                                <Grid item xs={8} md={6} lg={4}>
                                                    <TextField

                                                        label="Previous ID"
                                                        className="formtext"
                                                        placeholder="ID"
                                                        fullWidth
                                                        value={previousId}
                                                        disabled
                                                        variant="outlined"
                                                        onChange={(e) => setPreviousId(e.target.value) }
                                                        margin="dense"
                                                    />
                                                </Grid>
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
                                                                name={prevdateoftermination}
                                                                id="prevdateoftermination"
                                                                disabled
                                                                value={prevdateoftermination}
                                                                onChange={(date) => setPrevdateoftermination(date)}
                                                                renderInput={(params) => <TextField {...params} />}
                                                            />
                                                        </LocalizationProvider>
                                                    </FormControl>
                                                </Grid>
                                            </>
                                    }
                                    </Grid> : null
                            }
                        </>
                        <br/>

                        <Grid container spacing={2}>
                            <Grid item xs={8} md={6} lg={4}>
                                <div className="TableClass">
                                    <h4 style={{marginRight:10}}> Office Details </h4>
                                    {
                                        payCount % 2 === 0 ?
                                            <RemoveCircleIcon
                                                style={{color:"blue", cursor:"pointer", marginTop:2}}
                                                onClick={() => showPersonal()}
                                            />
                                            : <AddCircleIcon
                                                style={{color:"blue", cursor:"pointer", marginTop:2}}
                                                onClick={() => showPersonal()}
                                            />}
                                </div>
                            </Grid>
                        </Grid>
                        <br/>
                        <>
                            {
                                personal === true ?
                                    <Grid container spacing={2}>
                                        <Grid item xs={8} md={6} lg={4}>
                                            <TextField
                                                label="Distribution Channel"
                                                className="formtext"
                                                placeholder="Distribution Channel"
                                                fullWidth
                                                value={distributionChannel}
                                                variant="outlined"
                                                onChange={(e) => setDistributionChannel(e.target.value) }
                                                margin="dense"
                                            />
                                        </Grid>
                                        <Grid item xs={8} md={6} lg={4}>
                                            <TextField
                                                select
                                                label="Office"
                                                className="formtext"
                                                placeholder="Office"
                                                fullWidth
                                                value={officeId}
                                                variant="outlined"
                                                onChange={(e) => officeChange(e.target.value) }
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
                                                label="Area Code"
                                                className="formtext"
                                                placeholder="Area Code"
                                                fullWidth
                                                value={areaCode}
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
                                                value={agentType}
                                                variant="outlined"
                                                onChange={(e) => setAgentType(e.target.value) }
                                                margin="dense"
                                            >
                                                {
                                                    agenttype.map((type) => (
                                                        <MenuItem value={type.id}> {type.agentLevelDesc} - {type.agentLevelId}</MenuItem>
                                                    ))
                                                }
                                            </TextField>
                                        </Grid>
                                        <Grid item xs={8} md={6} lg={4}>
                                            <TextField
                                                select
                                                label="Up Level Agent"
                                                className="formtext"
                                                placeholder="Up Level Agent ID"
                                                fullWidth
                                                value={upLevelAgentId}
                                                variant="outlined"
                                                onChange={(e) => setUpLevelAgentId(e.target.value) }
                                                margin="dense"
                                            >
                                                <MenuItem value={null}> --NULL-- </MenuItem>
                                                {
                                                    Agents.map((value) => (
                                                        <MenuItem value={value.id}> {value.client?.givenName} {value.client?.surName} </MenuItem>
                                                    ))
                                                }
                                            </TextField>
                                        </Grid>
                                    </Grid>
                                    : null
                            }
                        </>
                        <br/>
                        <Grid container spacing={2}>
                                <Grid item xs={8} md={6} lg={4}>
                                        <div className="TableClass">
                                                <h4 style={{marginRight:10}}> Pay Details </h4>
                                                {
                                                    payCount % 2 === 0 ?
                                                        <RemoveCircleIcon
                                                            style={{color:"blue", cursor:"pointer", marginTop:2}}
                                                            onClick={() => showPay()}
                                                        />
                                                        : <AddCircleIcon
                                                            style={{color:"blue", cursor:"pointer", marginTop:2}}
                                                            onClick={() => showPay()}
                                                        />}
                                            </div>
                                </Grid>
                        </Grid>
                        <br/>
                        <>
                            {
                                pay === true ?
                                        <Grid container spacing={2}>
                                            <Grid item xs={8} md={6} lg={4}>
                                                <TextField
                                                    select
                                                    label="Pay Method"
                                                    className="formtext"
                                                    placeholder="Pay Method"
                                                    fullWidth
                                                    value={payMethod}
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
                                                    select
                                                    label="Pay Frequency"
                                                    className="formtext"
                                                    placeholder="Pay Frequency"
                                                    fullWidth
                                                    value={payFrequency}
                                                    variant="outlined"
                                                    onChange={(e) => setPayFrequency(e.target.value) }
                                                    margin="dense"
                                                >
                                                    {
                                                        Paying.map((value) => (
                                                            <MenuItem value={value}> {value} </MenuItem>
                                                        ))
                                                    }
                                                </TextField>
                                            </Grid>
                                            <Grid item xs={8} md={6} lg={4}>
                                                <TextField
                                                    select
                                                    label="Currency Type"
                                                    className="formtext"
                                                    placeholder="Currency Type"
                                                    fullWidth
                                                    value={currencyType}
                                                    variant="outlined"
                                                    onChange={(e) => setCurrencyType(e.target.value) }
                                                    margin="dense"
                                                >
                                                    {
                                                        Currency.map((value) => (
                                                            <MenuItem value={value}> {value} </MenuItem>
                                                        ))
                                                    }
                                                </TextField>
                                            </Grid>
                                        </Grid>
                                    : null
                            }
                        </>
                        <br/>
                            <Grid container spacing={2}>
                                <Grid item xs={8} md={6} lg={4}>
                                    <div className="TableClass">
                                            <h4 style={{marginRight:10}}> Commission  Details </h4>
                                            {
                                                commissionCount % 2 === 0 ?
                                                    <RemoveCircleIcon
                                                        style={{color:"blue", cursor:"pointer", marginTop:2}}
                                                        onClick={() => showCommission()}
                                                    />
                                                    :
                                                    <AddCircleIcon
                                                        style={{color:"blue", cursor:"pointer", marginTop:2}}
                                                        onClick={() => showCommission()}
                                                    />}
                                        </div>
                                </Grid></Grid>
                        <br/>
                            <>
                                {
                                   commissionDetails === true ?
                                        <Grid container spacing={2}>
                                        <Grid item xs={8} md={6} lg={4}>
                                            <TextField
                                                type="number"
                                                label="Minimum Amount"
                                                className="formtext"
                                                placeholder="Minimum Amount"
                                                fullWidth
                                                value={minimumAmount}
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
                                                value={bonusAllocation}
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
                                                value={basicCommission}
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
                                                value={servicingCommission}
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
                                                value={commissionClass}
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
                                                value={renewalCommission}
                                                variant="outlined"
                                                onChange={(e) => setRenewalCommission(e.target.value) }
                                                margin="dense"
                                            />
                                        </Grid>
                                        </Grid>
                                       : null
                                }
                            </>
                    </Grid>
                </Box>
            </form>
            <br/>
            <div>
                <Button
                    color="primary"
                    variant="contained"
                    style={{marginRight: 10}}
                    type="submit"
                    onClick={() => saveAgent()}
                > Save </Button>

                        <Button
                            color="error"
                            variant="contained"
                            onClick={() => close()}> Cancel </Button>
            </div>

            <Modal
                dialogAs={DraggableComponent}
                show={clientmodal}
                onHide={clientClose}
                centered
                size="lg"
            >
                <Modal.Header closeButton> <Modal.Title> Client Add </Modal.Title> </Modal.Header>
                <Modal.Body>
                    <div className="container">
                    <ClientDetailsAdd modal={clientmodal} clientclose={clientClose}/>
                    <br/>
                    {
                        clientmodal === true ? <Button
                            color="error"
                            variant="contained"
                            onClick={() => clientClose()}> Cancel </Button> : null
                    }
                    </div>
                </Modal.Body>
            </Modal>


        </div>
    );
};

export default AgentAdd;
