import React from 'react';

const AccountingRuleInfo = ({data}) => {
    return (
        <div>
            <h6> ID  :{data.id} </h6>
            <h6> Accounting Rule  : {data.accountingRuleId} </h6>
            <h6> Accounting Rule Account Sign : {data.accountSign} </h6>
                <h6> Company Currency : {data.companyCurrency?.currencyCode} </h6>
            <h4> Account Code </h4>
            <h6> ID  :{data.id} </h6>
            <h6> Account Code : {data.accountCodeTable?.accountCode}</h6>
            <h6> Account Short Description : {data.accountCodeTable?.accountShortDescription} </h6>
            <h6> Account Long Description  : {data.accountCodeTable?.accountLongDescription} </h6>
                <h4> Sub Account Code </h4>
                <h6> ID  :{data.id} </h6>
                <h6> Sub Account Code : {data.subAccountTable?.subAccountCode}</h6>
                <h6> Sub Account Short Description : {data.subAccountTable?.subAccountShortDesc} </h6>
                <h6> Sub Account Long Description  : {data.subAccountTable?.subAccountLongDesc} </h6>
                <h6> Sub Account Sign : {data.subAccountTable?.accountSign} </h6>


        </div>
    );
};

export default AccountingRuleInfo;
