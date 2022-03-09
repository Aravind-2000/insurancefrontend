import React,{useEffect, useState} from 'react';
import {MenuItem, TextField} from "@mui/material";
import InsuranceApi from "../../Service/InsuranceApi";
import Button from "@mui/material/Button";
import VisibilityIcon from '@mui/icons-material/Visibility';
import {Dialog, DialogContent} from "@material-ui/core";

const ProofsAdd = ({
    clientid, proofs,close, setproofs
                   }) => {


    const [proofID, setProofId] = useState("");
    const [proofName, setProofName] = useState(" ");
    const [proofPurpose, setProofPurpose] = useState("");
    const [proofFile, setProofFile] = useState(" ");
    const [clientID, setClientId] = useState(clientid);

    const [purposearray, setPurposearray] = useState([]);

    const uploadImage = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        setProofFile(base64);
    };

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };


    useEffect(() => {
        InsuranceApi.getParameterRule("PR001").then((res) => {
            setPurposearray(res.data)
        })
            .catch((err) => {
                console.log(err);
            })

    }, []);


    const saveProofs = () => {

        const proof = {proofID, proofName, proofPurpose, proofFile, clientID}

        InsuranceApi.saveProofs(proof).then((res) => {
            console.log(res.data);
            setProofId(" ");
            setProofName(" ");
            setProofPurpose(" ");
            InsuranceApi.getClient(clientID).then((res) => {
                setproofs(res.data.proofList);
                console.log(res.data.proofList);
            })
        })
            .catch((err) => {
                console.log(err);
            })

    }

    const [proofslist, setProofslist] = useState(false);
    const [img, setImg] = useState("");
    const showProof = (file) => {
        setImg(file);
        setProofslist(true);
    }
    const closeProof = () => {
        setProofslist(false);
    }

    return (
        <div>
            <div className="container">
                <form>
                <div className="row">
                    <div className="col">
                        <TextField
                            label="Proof ID"
                            className="formtext"
                            placeholder="Proof ID"
                            fullWidth
                            variant="outlined"
                            value={proofID}
                            onChange={(e) => setProofId(e.target.value)}
                            margin="dense"
                        />
                    </div>
                    <div className="col">
                        <TextField
                            label="Proof Name"
                            className="formtext"
                            placeholder="Proof Name"
                            fullWidth
                            variant="outlined"
                            value={proofName}
                            onChange={(e) => setProofName(e.target.value)}
                            margin="dense"
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <TextField
                            select
                            label="Proof Purpose"
                            className="formtext"
                            placeholder="Proof Purpose"
                            fullWidth
                            variant="outlined"
                            onChange={(e) => setProofPurpose(e.target.value)}
                            margin="dense"
                        >
                            {
                                purposearray.map((arr) => (
                                    <MenuItem value={arr}> {arr} </MenuItem>
                                ))
                            }
                        </TextField>
                    </div>
                    <div className="col">
                        <TextField
                            label="Client ID"
                            className="formtext"
                            placeholder="Client ID"
                            fullWidth
                            variant="outlined"
                            value={clientID}
                            onChange={(e) => setClientId(e.target.value)}
                            margin="dense"
                        />
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col" style={{marginLeft:23}}>
                        <label> Proof File </label><br/> <br/>
                        <input
                            type="file"
                            onChange={(e) => uploadImage(e)}
                        />
                    </div>
                </div>
                    <br/>
                <div className="row">
                    <div className="col">
                        <Button
                            color="primary"
                            style={{ marginTop: "1rem" , marginLeft:20}}
                            variant="contained"
                            onClick={() => saveProofs()} > Submit </Button>
                    </div>
                    <div className="col">
                        <Button
                            color="error"
                            style={{ marginTop: "1rem" , marginLeft:20}}
                            variant="contained"
                            onClick={() => close()} > Cancel </Button>
                    </div>
                </div>
                </form>

                <hr/>

                <div>
                    <h4 style={{backgroundColor:"Black", color:"White", textAlign:"center"}}>  Added Proofs List </h4>
                    {
                        proofs.map((proof) => (
                            <div className="row">
                                <div className="col">
                                    {proof.proofName}
                                </div>
                                <div className="col">
                                    <VisibilityIcon
                                        style={{cursor:"pointer"}}
                                        onClick={() => showProof(proof.proofFile)}
                                    />
                                </div>
                            </div>

                        ))
                    }
                </div>
            </div>

            <Dialog
                open={proofslist}
                onClose={closeProof}
                maxWidth="lg"
            >
                <DialogContent>
                    <img src={img} width="600" height="250"/>
                </DialogContent>
            </Dialog>

        </div>
    );
};

export default ProofsAdd;
