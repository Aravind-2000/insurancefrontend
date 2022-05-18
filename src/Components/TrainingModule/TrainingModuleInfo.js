import React from 'react';

const TrainingModuleInfo = ({data}) => {
    return (
        <div>

            <h3> Training Module Details </h3>
            <h6> Training Module ID: {data.id} </h6>
            <h6> Training Module Topic: {data.trainingTopic} </h6>
            <h6> Training Module Description: {data.trainingDesc} </h6>
            <h6> Training Module No of Days: {data.noOfDays} </h6>
            <h6> Training Level: {data.trainingLevel} </h6>
            <h4> Module Cost Details </h4>
            <h6> Training Base Fee: {data.trainingCost?.baseFee} </h6>
            <h6> Training Trainer Fee: {data.trainingCost?.trainerFee} </h6>
            <h6> Training Venue Fee: {data.trainingCost?.venueFee} </h6>
            <h6> Number of days training Cost to be Paid before : {data.trainingCost?.payBeforeDays}  </h6>
            <h6> Training Cost Currency :  {data.trainingCost?.currency} </h6>

        </div>
    );
};

export default TrainingModuleInfo;
