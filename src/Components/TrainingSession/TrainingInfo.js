import React from 'react';
import moment from "moment";

const TrainingInfo = ({data}) => {
    return (
        <div>


            <h3> Training Module Details </h3>
            <h6> Module ID : {data.trainingModule?.id} </h6>
            <h6> Module Topic : {data.trainingModule?.trainingTopic} </h6>
            <h6> Module Description : {data.trainingModule?.trainingDesc} </h6>
            <h6> Module Total Days : {data.trainingModule?.noOfDays} </h6>
            <h6> Module Level : {data.trainingModule?.trainingLevel} </h6>

            <h4> Module Cost Details </h4>

            <h6> Training Base Fee: {data.trainingModule?.trainingCost?.baseFee} </h6>
            <h6> Training Trainer Fee: {data.trainingModule?.trainingCost?.trainerFee} </h6>
            <h6> Training Venue Fee: {data.trainingModule?.trainingCost?.venueFee} </h6>
            <h6> Number of days training Cost to be Paid before : {data.trainingModule?.trainingCost?.payBeforeDays}  </h6>
            <h6> Training Cost Currency {data.trainingModule?.trainingCost?.currency} </h6>


            <h3> Session Details </h3>
            <h6> Training Type : {data.trainingType.toUpperCase()} </h6>
            <h6> Training Mode : {data.trainingMode.toUpperCase()} </h6>

            <h6> Training Start Date : {moment(data.startDate).format("DD-MMM-YYYY")} </h6>
            <h6> Training End Date : {moment(data.endDate).format("DD-MMM-YYYY")} </h6>
            <h6> Training Timing : {data.trainingTime.toUpperCase()} </h6>
            <h6> Training Trainer : {data.trainer.toUpperCase()} </h6>
            <h6> Training Cost in {data.trainingModule?.trainingCost?.currency} : {data.trainingCost} </h6>

        </div>
    );
};

export default TrainingInfo;
