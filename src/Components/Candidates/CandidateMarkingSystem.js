import React, {useEffect, useState} from 'react';
import {Modal} from "react-bootstrap";
import { NativeSelect, TextareaAutosize} from "@mui/material";
import InsuranceApi from "../../Service/InsuranceApi";
import {BsCheck2All} from "react-icons/bs";
import {Rating} from "@mui/lab";

const CanidateMarkingSystem = (
    {
        open,
        close,
        candidate,
        setcandidate,
        markid,markname
    }
) => {

    const [status, setStatus] = useState([]);
    const overall = Math.round((candidate?.numericalAbility + candidate?.verbalAbility + candidate?.logicalReasoning + candidate?.codingAndDecoding) / 4);

    useEffect(() => {
        InsuranceApi.getParameterRule("S0002").then((res) => {
            setStatus(res.data)
        })
            .catch((error) => {
                console.log(error)
            })
    }, []);



    const saveQuants = () =>{

        const quants = {
            id: markid,
            numericalAbility : candidate.numericalAbility,
            numericalAbilityComments : candidate.numericalAbilityComments,
            logicalReasoning : candidate.logicalReasoning,
            logicalReasoningComments : candidate.logicalReasoningComments,
            verbalAbility : candidate.verbalAbility,
            verbalAbilityComments : candidate.verbalAbilityComments,
            codingAndDecoding : candidate.codingAndDecoding,
            codingAndDecodingComments : candidate.codingAndDecodingComments,
            overallRating : overall,
            result : candidate.result
        }

        InsuranceApi.updateQuantsDetails(quants).then((res) => {
            console.log(res.data)
        })
            .catch((error) => {
                console.log(error)
            })
        close();
    }

    const editChange = (e) => {
        const { value, id } = e.target;
        setcandidate({ ...candidate, [id]: value });
    };




    return (
        <div>
            <Modal
                show={open}
                onHide={close}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title> Rating for {markname}</Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <div className="container">
                        <label> Numberical Ability </label>
                        <br/>
                        <Rating
                            name="simple-controlled"
                            value={candidate?.numericalAbility}
                            id="numericalAbility"
                            max={5}
                           onChange={(e, newvalue) => {setcandidate({...candidate, numericalAbility: newvalue})}}
                        /> <br/>
                        <TextareaAutosize
                            value={candidate?.numericalAbilityComments}
                            placeholder="Comments"
                            style={{ width: 400 }}
                            id="numericalAbilityComments"
                            onChange={(e) => editChange(e)}
                        />
                        <br/>




                        <label> Logical Ability </label>
                        <br/>
                        <Rating
                            name="simple-controlled"
                            value={candidate?.logicalReasoning}
                            id="logicalReasoning"
                            max={5}
                            onChange={(e, newvalue) => {setcandidate({...candidate, logicalReasoning: newvalue})}}
                        /><br/>
                        <TextareaAutosize
                            value={candidate?.logicalReasoningComments}
                            placeholder="Comments"
                            style={{ width: 400 }}
                            id="logicalReasoningComments"
                            onChange={(e) => editChange(e)}
                        />
                        <br/>



                        <label> Verbal Ability </label>
                        <br/>
                        <Rating
                            name="simple-controlled"
                            value={candidate?.verbalAbility}
                            id="verbalAbility"
                            max={5}
                            onChange={(e, newvalue) => {setcandidate({...candidate, verbalAbility: newvalue})}}
                        /><br/>
                        <TextareaAutosize
                            value={candidate?.verbalAbilityComments}
                            placeholder="Comments"
                            style={{ width: 400 }}
                            id="verbalAbilityComments"
                            onChange={(e) => editChange(e)}
                        />
                        <br/>



                        <label> Coding Knowledge </label>
                        <br/>
                        <Rating
                            name="simple-controlled"
                            value={candidate?.codingAndDecoding}
                            id="codingAndDecoding"
                            max={5}
                            onChange={(e, newvalue) => {setcandidate({...candidate, codingAndDecoding: newvalue})}}
                        /><br/>
                        <TextareaAutosize
                            value={candidate?.codingAndDecodingComments}
                            placeholder="Comments"
                            style={{ width: 400 }}
                            id="codingAndDecodingComments"
                            onChange={(e) => editChange(e)}
                        />
                        <br/>




                        <label> Overall Rating </label>
                        <br/>
                        <Rating
                            name="simple-controlled"
                            value={overall}
                            id="overallRating"
                            max={5}
                        /><br/><br/>

                        <h5> Result </h5>
                        <NativeSelect
                            id="result"
                            value={candidate?.result}
                            style={{width:150}}
                            placeholder="result"
                            onChange={(e) => editChange(e)}
                        >
                            <option/>
                            {
                                status.map((value) => (
                                    <option value={value}> {value.toUpperCase()} </option>
                                ))
                            }

                        </NativeSelect> <br/> <br/>


                        <BsCheck2All
                            style={{cursor:"pointer"}}
                            onClick={() => saveQuants()}
                        />

                    </div>
                </Modal.Body>
            </Modal>
            
        </div>
    );
};

export default CanidateMarkingSystem;
