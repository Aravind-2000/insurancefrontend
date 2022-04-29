import React, {useState,useEffect} from 'react';
import InsuranceApi from "../../Service/InsuranceApi";
import moment from "moment";

const TraineeAgentInfo = ({data}) => {


    useEffect(() => {
        InsuranceApi.getTraining(data.trainingId).then((res) => {
            setTraining(res.data)
        }).catch(err => console.log(err))
    }, [data.trainingId]);


    const [training, setTraining] = useState("");


    return (
        <div>

            <h4> Training Details </h4>

            <h6> Training ID : {training.id} </h6>
            <h6> Training Topic : {training.trainingTopic} </h6>
            <h6> Training Mode : {training.trainingMode} </h6>
            <h6> Training Type : {training.trainingType} </h6>
            <h6> Training time : {training.trainingTime} </h6>

            <h4> Agent Details </h4>
            <h6> Agent : {data.agent?.id} - {data.agent?.client?.givenName} {data.agent?.client?.surName} </h6>
            <h6> Gender : {data.agent?.client?.gender} </h6>

            <h4> General Details </h4>
            <h6> Is Approved : {data.isApproved} </h6>
            <h6> Approved By : {data.approvedByAgent?.client?.givenName} {data.approvedByAgent?.client?.surName} </h6>
            <h6> Approved Date : {moment(data.approvedDate).format("DD-MMM-YYYY")} </h6>
            <h6> Total Days : {data.totalDays} </h6>
            <h6> Total Days Attended : {data.daysAttended} </h6>
            <h6> Training Score : {data.trainingScore} </h6>
            <h6> Training Status : {data.trainingStatus} </h6>
            <h6> Comments : {data.comments} </h6>


        </div>
    );
};

export default TraineeAgentInfo;
