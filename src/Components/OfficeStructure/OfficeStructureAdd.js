import React, { useState} from 'react';
import {Box, Grid, MenuItem, TextField} from "@mui/material";
import axios from "axios";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {Modal} from "react-bootstrap";
import CompanyAdd from "../Company/CompanyAdd";

const OfficeStructureAdd = ({
    getAll, close, company,setCompany, OfficeLevels
}) => {




    // Mention the variable and their states.
    const [companyId, setCompanyId] = useState("");
    const [officeLevelId, setOfficeLevelId] = useState("");
    const [officeStatus, setOfficeStatus] = useState("");
    const [officeName, setOfficeName] = useState("");
    const [upLevelOfficeId, setUpLevelOfficeId] = useState("");


    const [companyModal, setCompanyModal] = useState(false);
    const companyOpen = () => {
        setCompanyModal(true);
    }

    const companyClose = () => {
        axios.get(`http://localhost:8090/company/getall`).then((res) => {
            setCompany(res.data)
        }).catch((err) => console.log(err))
        setCompanyModal(false);
    }


    //Add API call
    const handleFormSubmit = (e) => {
        const officeStructure = {
            companyId,
            officeLevelId,
            officeStatus,
            officeName,
            upLevelOfficeId,
        };
        axios
            .post(`http://localhost:8090/officestructure/add/` + sessionStorage.getItem("userid"), officeStructure, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                }
            })
            .then((Response) => {
                console.log(Response.data);
                close();
                getAll();
            })
            .catch((error) => {
                console.log(error);
            });
    };





    return (
        <div >
            {/*form for add*/}

            <form autoComplete="off">
                <Box sx={{flexGrow: 1}}>
                    <Grid container spacing={2}>
                        <Grid item xs={8} md={6} lg={4}>
                    <TextField
                        select
                        value={companyId}
                        margin="dense"
                        fullWidth
                        variant="outlined"
                        label="Company ID"
                        className="formtext"
                        placeholder="Company Id"
                        onChange={(e) => setCompanyId(e.target.value)}
                    >
                        {
                            company.map((value, index) => (
                                <MenuItem value={value.companyId}> {value.companyName} </MenuItem>
                            ))
                        }

                    </TextField>
                        </Grid>

                        <Grid item xs={8} md={6} lg={4}>
                            <Button
                                style={{ marginTop: "1rem", marginLeft:20, paddingRight:2 }}
                                variant="contained"
                                color="error"
                                onClick={() => companyOpen()}
                                startIcon={<AddCircleIcon />}
                            />
                        </Grid>

                        <Grid item xs={8} md={6} lg={4}>
                    <TextField
                        select
                        value={officeLevelId}
                        margin="dense"
                        fullWidth
                        variant="outlined"
                        className="formtext"
                        label="Office Level Id"
                        placeholder="Office Level "
                        onChange={(e) => setOfficeLevelId(e.target.value)}
                    >
                        {
                            OfficeLevels.map((value,index) => (
                                <MenuItem value={value.id} > {value.officeLevelDesc} {value.officeLevelId} </MenuItem>
                            ))
                        }

                    </TextField>
                        </Grid>

                        <Grid item xs={8} md={6} lg={4}>
                    <TextField
                        value={officeStatus}
                        margin="dense"
                        variant="outlined"
                        label="Office Status"
                        fullWidth
                        placeholder="Office Status"
                        className="formtext"
                        onChange={(e) => setOfficeStatus(e.target.value)}
                    /> </Grid>

                        <Grid item xs={8} md={6} lg={4}>
                    <TextField
                        value={officeName}
                        margin="dense"
                        variant="outlined"
                        label="Office Name"
                        fullWidth
                        placeholder="Office Name"
                        className="formtext"
                        onChange={(e) => setOfficeName(e.target.value)}
                    /></Grid>

                        <Grid item xs={8} md={6} lg={4}>
                    <TextField
                        value={upLevelOfficeId}
                        margin="dense"
                        variant="outlined"
                        fullWidth
                        label="Up Level Office Id"
                        placeholder="Up Level Office Id"
                        className="formtext"
                        onChange={(e) => setUpLevelOfficeId(e.target.value)}
                    /> </Grid>

                    </Grid>
                </Box>
            </form>
            <br/>
            <Button
                color="primary"
                variant="contained"
                style={{marginRight:10}}
                onClick={() => handleFormSubmit()}
            >
                Save
            </Button>

            <Button
                color="error"
                variant="contained"
                onClick={() => close()}
            >
                Cancel
            </Button>


            <Modal
                show={companyModal}
                onHide={companyClose}
                centered
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title> Add Company </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <CompanyAdd close={companyClose}/>
                    </div>
                    <br/>
                    {
                        companyModal === true ? <Button
                            color="error"
                            variant="contained"
                            style={{marginLeft:10}}
                            onClick={() => companyClose()}> Cancel </Button> : null
                    }
                </Modal.Body>
            </Modal>

        </div>
    );
};

export default OfficeStructureAdd;
