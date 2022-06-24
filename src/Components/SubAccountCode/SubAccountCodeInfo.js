import React from 'react';
import moment from "moment";

const SubAccountCodeInfo = ({data}) => {
    return (
        <div>

            <h6> ID  :{data.id} </h6>
            <h6> Sub Account Code : {data.subAccountCode}</h6>
            <h6> Sub Account Short Description : {data.subAccountShortDesc} </h6>
            <h6> Sub Account Long Description : {data.subAccountLongDesc} </h6>
            <h6> Sub Account Sign : {data.accountSign} </h6>
            <h6> Created Date : {moment(data.createdDate).format("DD-MM-YYYY HH:mm")} </h6>
            <h6> Modified Date : {moment(data.modifiedDate).format("DD-MM-YYYY HH:mm")} </h6>
            
        </div>
    );
};

export default SubAccountCodeInfo;
