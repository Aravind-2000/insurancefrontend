import React from 'react';

const TrainingCostInfo = ({data}) => {
    return (
        <div>

            <h3> Training Cost Info </h3>
            <h6> Training Cost ID: {data.id} </h6>
            <h6> Training Base Fee: {data.baseFee} </h6>
            <h6> Training Trainer Fee: {data.trainerFee} </h6>
            <h6> Training Venue Fee: {data.venueFee} </h6>
            <h6> Number of days training Cost to be Paid before : {data.payBeforeDays}  </h6>
            <h6> Training Cost Currency {data.currency} </h6>


        </div>
    );
};

export default TrainingCostInfo;
