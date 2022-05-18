import React, {useState} from 'react';
import {Box, Grid, MenuItem} from "@material-ui/core";
import { Button, TextField} from "@mui/material";
import "../Css/Content.css"
import InsuranceApi from "../../Service/InsuranceApi";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {Modal} from "react-bootstrap";
import TrainingCostAdd from "../TrainingCost/TrainingCostAdd";

const TrainingModuleAdd = ({costs, close, getAll, level, setCosts}) => {


    const [trainingCostId, setTrainingCostId] = useState("");
    const [trainingTopic, setTrainingTopic] = useState("");
    const [trainingDesc, setTrainingDesc] = useState("");
    const [noOfDays, setNoOfDays] = useState("");
    const [trainingLevel, setTrainingLevel] = useState("");
    const [currencies, setCurrencies] = useState([]);


    const formSubmit = () => {
        const body = {
            trainingCostId, trainingTopic, trainingDesc, noOfDays, trainingLevel
        }
        InsuranceApi.addTrainingModule(body).then((res) => {
            close()
            getAll()
        }).catch(err => console.log(err))
    }

    const [cost, setCost] = useState(false);
    const costOpen = () => {
        InsuranceApi.getParameterRule("CR001").then((res) => {
            setCurrencies(res.data)
        }).catch(err => console.log(err))
        setCost(true);
    }
    const costClose = () => {
        InsuranceApi.getAllTrainingCost().then((res) => {
            setCosts(res.data)
        }).catch(err => console.log(err))
        setCost(false)
    }


    return (
        <div>
            <br/>
            <form autoComplete="off" onSubmit={formSubmit}>
                <Box sx={{flexGrow: 1}}>
                    <Grid container spacing={2}>

                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                select
                                fullWidth
                                className="formtext"
                                margin="dense"
                                variant="outlined"
                                placeholder="Enter Training cost"
                                value={trainingCostId}
                                label="Training Cost"
                                onChange={(e) => setTrainingCostId(e.target.value)}
                                required
                            >
                                {
                                    costs.map((val) => (
                                        <MenuItem value={val.id}> {val.id} - {val.baseFee + val.trainerFee + val.venueFee} </MenuItem>
                                    ))
                                }
                            </TextField>
                        </Grid>

                        <Grid item xs={8} md={6} lg={4}>
                            <Button
                                style={{ marginLeft:"2rem",  marginTop: "1rem", paddingRight:2 }}
                                variant="contained"
                                color="error"
                                onClick={() => costOpen()}
                                startIcon={<AddCircleIcon/>}
                            />
                        </Grid>


                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                fullWidth
                                className="formtext"
                                margin="dense"
                                variant="outlined"
                                placeholder="Enter Training topic "
                                value={trainingTopic}
                                label="Training Topic"
                                onChange={(e) => setTrainingTopic(e.target.value)}
                                required
                            />
                        </Grid>

                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                fullWidth
                                className="formtext"
                                margin="dense"
                                variant="outlined"
                                placeholder="Enter Training Description "
                                value={trainingDesc}
                                label="Training Description"
                                onChange={(e) => setTrainingDesc(e.target.value)}
                                required
                            />
                        </Grid>

                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                fullWidth
                                className="formtext"
                                margin="dense"
                                variant="outlined"
                                placeholder="Enter Number of days training "
                                value={noOfDays}
                                label="No of days"
                                onChange={(e) => setNoOfDays(e.target.value)}
                                required
                            />
                        </Grid>

                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                select
                                fullWidth
                                className="formtext"
                                margin="dense"
                                variant="outlined"
                                placeholder="Enter training level "
                                value={trainingLevel}
                                label="Training Level"
                                onChange={(e) => setTrainingLevel(e.target.value)}
                                required
                            >
                                {
                                    level.map((val) => (
                                        <MenuItem value={val}> {val} </MenuItem>
                                    ))
                                }
                            </TextField>
                        </Grid>
                    </Grid>
                </Box>

                <div style={{display: "flex", margin:20}}>
                    <Button
                        type="submit"
                        color="primary"
                        variant="contained"> Save </Button>

                    <Button
                        color="error" variant="contained" style={{marginLeft:20}} onClick={() => close()}> Cancel </Button>
                </div>
            </form>

            <Modal
                show={cost}
                onHide={costClose}
                size="lg"
                centered
            >

                <Modal.Header closeButton> <Modal.Title> <h4>  Training Cost Add </h4> </Modal.Title> </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <TrainingCostAdd currencies={currencies} fromModuleClose={costClose}/>
                    </div>
                    <Button
                        color="error"
                        variant="contained"
                        style={{marginLeft:30}}
                        onClick={() => costClose()}> Cancel </Button>
                </Modal.Body>
            </Modal>

        </div>
    );
};

export default TrainingModuleAdd;
