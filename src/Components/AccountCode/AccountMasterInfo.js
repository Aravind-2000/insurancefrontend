import React from 'react';
import moment from "moment";

const AccountMasterInfo = ({data}) => {
    return (
        <div>
            <h6> ID  :{data.id} </h6>
            <h6> Account Code : {data.accountCode}</h6>
            <h6> Account Short Description : {data.accountShortDescription} </h6>
            <h6> Account Long Description : {data.accountLongDescription} </h6>
            <h6> Created Date : {moment(data.createdDate).format("DD-MM-YYYY HH:mm")} </h6>
            <h6> Modified Date : {moment(data.modifiedDate).format("DD-MM-YYYY HH:mm")} </h6>
        </div>
    );
};

export default AccountMasterInfo;
