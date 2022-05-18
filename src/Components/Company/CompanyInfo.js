import React from 'react';
import moment from "moment";

const CompanyInfo = ({data}) => {
    return (
        <div>

            <h3> Company Details </h3>
            <br/>
            <h6> Company ID : {data.companyId} </h6>
            <h6> Company Name  :{data.companyName} </h6>
            <h6> Company Country : {data.companyCountry} </h6>
            <h6> Company License Number : {data.companyLicenseNumber} </h6>
            <h6> Company License Issue Date : {moment(data.companyLicenseIssueDate).format("DD-MM-YYYY")} </h6>
            <h6> Company Currency : {data.companyCurrency} </h6>
            <h6> Company Status : {data.companyStatus} </h6>

        </div>
    );
};

export default CompanyInfo;
