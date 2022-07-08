import React from 'react';
import moment from "moment";

const PolicyHeaderInfo = ({data}) => {
    return (
        <div>

            <h6> ID : {data.id} </h6>
            <h6> Policy Number  : {data.policyNumber} </h6>
            <h6> Company : {data.company?.companyId} - {data.company?.companyName} </h6>
            <h6> Agent  : {data.agent?.id} - {data.agent?.client?.givenName} </h6>
            <h6> Premium : {data.premium} </h6>
            <h6> Coverage Status : {data.coverageStatus?.statusCode} -  {data.coverageStatus?.statusDesc}</h6>
            <h6> Coverage Policy Status : {data.coveragePolicyStatus?.statusCode} -  {data.coveragePolicyStatus?.statusDesc} </h6>
            <h6> Start Date : {moment(data.startDate).format("DD-MM-YYYY")} </h6>
            <h6> Bill Date : {moment(data.billDate).format("DD-MM-YYYY")} </h6>
            <h6> Paid Date : {moment(data.paidDate).format("DD-MM-YYYY")} </h6>
            <h6> Policy Currency : {data.policyCurrency?.currencyCode}</h6>
            <h6> Product  : {data.product?.statusCode} - {data.product?.statusDesc} </h6>

        </div>
    );
};

export default PolicyHeaderInfo;
