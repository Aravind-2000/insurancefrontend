import React from 'react';
import moment from "moment";

const TrainingInfo = ({data}) => {
    return (
        <div>

            <h6> Training Topic : {data.trainingTopic.toUpperCase()} </h6>
            <h6> Training Description : {data.trainingDesc.toUpperCase()} </h6>
            <h6> Training Type : {data.trainingType.toUpperCase()} </h6>
            <h6> Training Mode : {data.trainingMode.toUpperCase()} </h6>
            <h6> Training Level : {data.trainingLevel.toUpperCase()} </h6>
            <h6> Training Start Date : {moment(data.startDate).format("DD-MM-YYYY")} </h6>
            <h6> Training End Date : {moment(data.endDate).format("DD-MM-YYYY")} </h6>
            <h6> Training Timing : {data.trainingTime.toUpperCase()} </h6>
            <h6> Training Trainer : {data.trainer.toUpperCase()} </h6>
            <h6> Training Cost in Rupees : {data.trainingCost} </h6>
            <h6> Sponsored By : {data?.sponsoredBy} </h6>

        </div>
    );
};

export default TrainingInfo;
