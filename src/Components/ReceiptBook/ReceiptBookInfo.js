import React from 'react';
import moment from "moment";

const ReceiptBookInfo = ({data}) => {
    return (
        <div>
            <h6> ID : {data.id} </h6>
            <h6> Receipt Number : {data.receiptNo} </h6>
            <h6> Receipt Date : {moment(data.receiptDate).format("DD-MM-YYYY")} </h6>
            <h6> Agent Details  : {data.agent?.id} - {data.agent?.client?.givenName} </h6>
            <h6> Receipt Currency  : {data.receiptCurrency?.currencyCode} </h6>
            <h6> Receipt Method : {data.receiptMethod} </h6>
            <h6> Total Receipt Amount : {data.totalReceiptAmount} </h6>
        </div>
    );
};

export default ReceiptBookInfo;
