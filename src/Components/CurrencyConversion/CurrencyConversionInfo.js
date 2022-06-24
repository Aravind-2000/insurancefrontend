import React from 'react';
import moment from "moment";

const CurrencyConversionInfo = ({data}) => {
    return (
        <div>

            <h6> ID : {data.id} </h6>
            <h6> Sl Unique Number : {data.slUniqueNumber} </h6>
            <h6> Original Currency : {data.originalCurrency?.id} - {data.originalCurrency?.currencyCode} </h6>
            <h6> Original Currency Unit  : {data.originalCurrencyUnit}  </h6>
            <h6> Account Currency : {data.accountCurrency?.id} - {data.accountCurrency?.currencyCode} </h6>
            <h6> Exchange Rate : {data.exchangeRate} </h6>
            <h6> Start Date : {moment(data.startDate).format("DD-MM-YYYY")} </h6>
            <h6> End Date : {moment(data.endDate).format("DD-MM-YYYY")} </h6>


        </div>
    );
};

export default CurrencyConversionInfo;
