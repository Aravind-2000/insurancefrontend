import React, {useEffect, useState} from 'react';
import InsuranceApi from "../../Service/InsuranceApi";
import {Box, Button, Grid, MenuItem, TextField} from "@mui/material";

const PromoteDemote = ({close}) => {

    const btnstyle = { margin: "8px 0" , marginLeft: "1.5rem"};

    const [param, setParam] = useState([]);
    const [agentType, setAgentType] = useState([]);

    useEffect(() => {
        getParam()
        getAgentType()
    }, []);

    const getParam = () => {
        InsuranceApi.getParameterRule("PD001").then((res) => {
            setParam(res.data)
        }).catch((err) => console.log(err))
    }

    const getAgentType = () => {
        InsuranceApi.getAllAgentType().then((res) => {
            setAgentType(res.data)
        }).catch((err) => console.log(err))
    }

    const [agentId, setAgentId] = useState("");
    const [agentTypeId, setAgentTypeId] = useState("");
    const [promoteOrDemote, setPromoteOrDemote] = useState("");


    const formSubmit = () => {

        const body = {agentId, agentTypeId, promoteOrDemote}
        InsuranceApi.doPromoteOrDemote(body).then((res) => {
            close()
        }).catch(err => console.log(err))

    }

    return (
        <div className="container">

            <form autoComplete="off" onSubmit={formSubmit}>
                <Box sx={{flexGrow: 1}}>
                    <Grid container spacing={2}>
                    <TextField
                        className="formtext"
                        label="Agent ID"
                        value={agentId}
                        placeholder="Enter Agent ID"
                        onChange={(e) => setAgentId(e.target.value)}
                        fullWidth
                        required
                    />

                    <br/>

                    <TextField
                        select
                        className="formtext"
                        label="Description"
                        value={promoteOrDemote}
                        placeholder="Promotion or Demotion"
                        onChange={(e) => setPromoteOrDemote(e.target.value)}
                        fullWidth
                        required
                    >
                        {
                            param.map((val) => (
                                <MenuItem value={val}> {val} </MenuItem>
                            ))
                        }
                    </TextField>

                    <br/>
                    <TextField
                        select
                        className="formtext"
                        label="Agent Type"
                        value={agentTypeId}
                        placeholder="Enter the Agent Type"
                        onChange={(e) => setAgentTypeId(e.target.value)}
                        fullWidth
                        required
                    >
                        {
                            agentType.map((val) => (
                                <MenuItem value={val.id}> {val.agentLevelDesc} - {val.agentLevelId}</MenuItem>
                            ))
                        }
                    </TextField>
                        <br/>

                        <div style={{display:"flex", marginTop:20}}>
                        <Button
                            color="primary"
                            style={btnstyle}
                            variant="contained"
                            type="submit"> Save </Button>
                        <Button
                            color="error"
                            style={btnstyle}
                            variant="contained"
                            onClick={() => close()}> Cancel </Button>
                        </div>
                    </Grid>
                </Box>
            </form>
            
        </div>
    );
};

export default PromoteDemote;
