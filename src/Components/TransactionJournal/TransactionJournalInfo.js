import React from 'react';
import moment from "moment";

const TransactionJournalInfo = ({data}) => {
    return (
        <div>

            <h6> ID : {data.id} </h6>
                <h6> Receipt ID  : {data.receiptId} </h6>
            <h6> Agent ID  : {data.agentId} </h6>
            <h5> Accounting Rule </h5>
            <h6> ID : {data.receiptReason?.id} </h6>
            <h6> Account Code Details  : {data.receiptReason?.accountCodeTable?.accountCode} - {data.receiptReason?.accountCodeTable?.accountLongDescription} </h6>
            <h6> Sub Account Code Details  : {data.receiptReason?.subAccountTable?.subAccountCode} - {data.receiptReason?.subAccountTable?.subAccountLongDesc} </h6>
            <h5> Transaction Details </h5>
            <h6> Transaction Code : {data.transactionCode?.transactionCode} </h6>
            <h6> Transaction Description  : {data?.transactionCode?.transactionDesc} </h6>
            <h6> Original Currency : {data.originalCurrencyCode?.currencyCode} </h6>
                <h6> Original Amount : {data.originalAmount} </h6>
            <h6> Account Currency  : {data.accountCurrencyCode?.currencyCode} </h6>
                <h6> Account Amount :  {data.accountAmount} </h6>
            <h6> Account Sign : {data.accountSign} </h6>

            <h5> Transaction Description Details</h5>
            <h6> ID : {data.transactionCode?.id} </h6>
            <h6> Transaction Code : {data.transactionCode?.transactionCode} </h6>
            <h6> Transaction Description : {data.transactionCode?.transactionDesc} </h6>
            <h6> Transaction Date and Time : {moment(data.transactionCode?.transactionDate).format("DD-MM-YYYY HH:mm")} </h6>

        </div>
    );
};

export default TransactionJournalInfo;
