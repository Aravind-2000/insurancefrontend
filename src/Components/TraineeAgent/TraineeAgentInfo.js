import React from 'react';
import moment from "moment";

const TraineeAgentInfo = ({data}) => {



    return (
        <div>

            <h4> Training Details </h4>

            <h6> Training ID : {data?.training.id} </h6>
            <h6> Training Topic : {data?.training.trainingTopic} </h6>
            <h6> Training Mode : {data?.training.trainingMode} </h6>
            <h6> Training Type : {data?.training.trainingType} </h6>
            <h6> Training time : {data?.training.trainingTime} </h6>

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
