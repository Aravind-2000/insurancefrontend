import React from 'react';
import moment from "moment";

const PolicyCoverInfo = ({data}) => {
    return (
        <div>

            <h6> ID : {data.id} </h6>
            <h6> Policy Header ID : {data.policyHeaderId} </h6>
                <h6> Policy Number : {data.policyNumber} </h6>
            <h6> Company : {data.company?.companyId} - {data.company?.companyName} </h6>
            <h6> Life : {data.life} </h6>
            <h6> Rider : {data.rider}</h6>
            <h6> Coverage : {data.coverage} </h6>
            <h6> Coverage Name  : {data.coverageName?.statusCode} - {data.coverageName?.statusDesc} </h6>
            <h6> Instant Premium  : {data.instantPremium} </h6>
            <h6> Sum Assured  : { data.sumAssured} </h6>
            <h6> Coverage Status : { data.coverageStatus?.statusCode} - { data.coverageStatus?.statusDesc} </h6>
            <h6> Premium Status : { data.policyStatus?.statusCode} - { data.policyStatus?.statusDesc} </h6>
            <h6> Risk End Date  : {moment(data.riskEndDate).format("DD-MM-YYYY")} </h6>
            <h6> Premium End Date  : {moment(data.premiumEndDate).format("DD-MM-YYYY")} </h6>

        </div>
    );
};

export default PolicyCoverInfo;
