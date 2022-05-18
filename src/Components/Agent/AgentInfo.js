import React, {useEffect, useState} from 'react';
import moment from "moment";
import {Col, Row} from "react-bootstrap";
import InsuranceApi from "../../Service/InsuranceApi";

const AgentInfo = ({data}) => {

    useEffect(() => {
        InsuranceApi.getOffice(data.officeId).then((res) => {
            setOffice(res.data)
        }).catch(err => console.log(err))
    }, [data.officeId]);

    const [office, setOffice] = useState("");


    return (
        <div>
            <Row>
                <Col>
                    <h3> Agent Details </h3>
                    <h6> Agent ID : {data.id} </h6>
                    <h6> Exclusive Agent : {data.exclusive} </h6>
                    <h6> Date Appointed : {data.dateAppointed} </h6>
                    <h6> Previous Agent: {data.previousAgent.toString()} </h6>
                    {
                        data.previousAgent === true ?
                            <>
                                <h6> Previous Agent ID: {data.previousAgentId} </h6>
                                <h6> Previous Date of Termination : {moment(data.prevDateOfTermination).format("DD-MM-YYYY")} </h6>
                            </>
                            : null
                    }

                    <h6> Distribution Channel : {data.distributionChannel} </h6>
                    <h6> Area Code : {data.areaCode} </h6>
                    <h6> Up Level Agent ID: {data.upLevelAgentId} </h6>
                    <br/>
                    <h3> Agent's Client Details </h3>
                    <h6> Client ID : {data.client?.id} </h6>
                    <h6> Given Name : {data.client?.givenName} </h6>
                    <h6> Sur Name : {data.client?.surName} </h6>
                    <h6> Gender and Salutation : {data.client?.gender} , {data.client?.salutation} </h6>
                    <h6> Marital  Status : {data.client?.marritalStatus} </h6>
                    <h6> E-Mail : {data.client?.email} </h6>
                    <h6> Mobile Number : {data.client?.mobileNumber} </h6>
                    <h6> Postal Code : {data.client?.postalCode} </h6>
                    <h6> Country : {data.client?.country} </h6>
                    <h6> Nationality : {data.client?.nationality} </h6>
                    <h6> Company Doctor : {data.client?.companyDoctor.toString()} </h6>
                    <h6> Birth Date : {moment(data.client?.birthDate).format("DD-MM-YYYY")} </h6>
                    <h6> Birth Place : {data.client?.birthPlace} </h6>
                    <h6> Language : {data.client?.language} </h6>
                    <h6> Category : {data.client?.category} </h6>
                    <h6> Occupation : { data.client?.occupation} </h6>
                </Col>

                <Col>

                    <h4> Agent Type Details </h4>
                    <h6> Agent Type Description : {data.agentTypeLevel?.agentLevelDesc} </h6>
                    <h6> Agent Type Level ID : {data.agentTypeLevel?.agentLevelId} </h6>
                    <br/>

                    <h3> Office Details </h3>
                    <h6> Office ID : {office.officeId} </h6>
                    <h6> Office Name : {office.officeName} </h6>
                    <h6> Office Status : {office.officeStatus} </h6>
                    <h6> Office Up Level ID : { office.upLevelOfficeId !== null ? office.upLevelOfficeId  : "NULL"} </h6>
                    <h3> Company Details </h3>
                    <h6> Company ID : {office.company?.companyId} </h6>
                    <h6> Company Name : {office.company?.companyName} </h6>
                    <h6> Company Country : {office.company?.companyCountry} </h6>
                    <h6> Company License Issue Date : {moment(office.company?.companyLicenseIssueDate).format("DD-MM-YYYY")} </h6>
                    <h6> Company Currency  : {office.company?.companyCurrency} </h6>
                    <h6> Company Status : {office.company?.companyStatus} </h6>
                    <br/>

                    <h4> Payment Details </h4>
                    <h6> Pay Method : {data.payMethod} </h6>
                    <h6> Pay Frequency : {data.payFrequency} </h6>
                    <h6> Currency Type : {data.currencyType}</h6>
                    <h6> Minimum Amount : {data.minimumAmount} </h6>
                    <h6> Bonus Allocation : {data.bonusAllocation} </h6>
                    <br/>

                </Col>

                <Col>

                    <h3> Agent's Address Details </h3>
                    <h6> To Address : { data.client?.address?.toAddress} </h6>
                    <h6> Address Line 1 : { data.client?.address?.addressLine1} </h6>
                    <h6> Address Line 2: { data.client?.address?.addressLine2} </h6>
                    <h6> City : { data.client?.address?.city} </h6>
                    <h6> State : { data.client?.address?.state} </h6>
                    <h6> Country : { data.client?.address?.country} </h6>
                    <h6> Pin code : { data.client?.address?.pincode} </h6>
                    <h6> Address Type : { data.client?.address?.addressType} </h6>
                    <h6> Is Present Address : { data.client?.address?.isPresentAddress.toString()} </h6>
                    <br/>

                    <h3> Agent's Bank Details </h3>
                    <h6> Account Number : {data.client?.bankAccount?.accountNumber} </h6>
                    <h6> Account Holder Name : {data.client?.bankAccount?.accountHolderName} </h6>
                    <h6> IFSC Number : {data.client?.bankAccount?.ifscCode} </h6>
                    <h6> Bank Name : {data.client?.bankAccount?.bankName} </h6>
                    <h6> Bank Branch : {data.client?.bankAccount?.bankBranch} </h6>
                    <br/>
                    <h4> Commission Details </h4>
                    <h6> Commission Class : {data.commissionClass} </h6>
                    <h6> Basic Commission  : {data.basicCommission} </h6>
                    <h6> Renewal Commission : {data.renewalCommission} </h6>
                    <h6> Servicing Commission  :{data.servicingCommission} </h6>

                    <br/>
                </Col>

            </Row>

        </div>
    );
};

export default AgentInfo;
