import React from 'react';
import moment from "moment";

const OfficeStructureInfo = ({data}) => {
    return (
        <div>

            <h3> Office Details </h3>
            <br/>
            <h6> Office ID          : {data.officeId} </h6>
            <h6> Office Name        : {data.officeName} </h6>
            <h6> Office Level       : {data.officeLevelParam?.officeLevelId} - {data.officeLevelParam?.officeLevelDesc} </h6>
            <h6> Up Level Office ID : {data.upLevelOfficeId !== null ? data.upLevelOfficeId : "NULL"} </h6>
            <h6> Office Status      : {data.officeStatus} </h6>
            <br/>
            <h3> Company Details  </h3>
            <br/>
            <h6> Company ID : {data.company?.companyId} </h6>
            <h6> Company Name : {data.company?.companyName} </h6>
            <h6> Company Country : {data.company?.companyCountry} </h6>
            <h6> Company License Number : {data.company?.companyLicenseNumber} </h6>
            <h6> Company License Issue Date : {moment(data.company?.companyLicenseIssueDate).format("DD-MM-YYYY")} </h6>
            <h6> Company Currency : {data.company?.companyCurrency} </h6>
            <h6> Company Status : {data.company?.companyStatus} </h6>

        </div>
    );
};

export default OfficeStructureInfo;
