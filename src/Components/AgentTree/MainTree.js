import React from "react";
import { useEffect, useState } from "react";
import { Tree, TreeNode } from "react-organizational-chart";
import styled from "styled-components";
import axios from "axios";
import ChildNodes from "./ChildNodes";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function MainTree() {
    const StyledNode = styled.div`
    padding: 5px;
    border-radius: 8px;
    display: inline-block;
    border: 1px solid red;
  `;
    const [data, setData] = useState("");
    const [officeId, setOfficeId] = useState();
    const [officeData, setOfficeData] = useState([]);

    const getid = () => {

        const userid = sessionStorage.getItem("userid")
        axios
            .get(`http://localhost:8090/officestructure/getall/${userid}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
            })
            .then((resp) => {
                console.log(resp);
                setOfficeData(resp.data);
                setOfficeId(resp.data.officeId);
            })
            .catch((err) => console.log(err));
    };

    const getdata = () => {
        const userid = sessionStorage.getItem("userid")
        axios
            .get(`http://localhost:8090/officestructure/getuplevel/${officeId}/${userid}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
            })
            .then((resp) => {
                console.log(resp);
                setData(resp.data);
            });
    };
    useEffect(() => {
        getdata();

        return () => {};
    }, [officeId]);

    useEffect(() => {
        getid();

        return () => {};
    }, [officeId]);

    const access = JSON.parse(sessionStorage.getItem("specialaccess"))

    const handleOfficeId = (e) => {
        if(access.find(element => element === "get-all-downlevel-offices")){
            setOfficeId(e.target.value);
            console.log(e.target.value);
        }
        else{
            window.alert("UNAUTHORIZED")
        }
    };

    const [division, setdivision] = useState(false);

    return (
        <div>
            <div style={{ textAlign: "center" }}>
                <h1 style={{ textAlign: "center" }}>Agent Hierarchy</h1>
                <FormControl style={{ width: "10rem" }}>
                    <InputLabel id="demo-simple-select-label">Office Id</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Office Id"
                        value={officeId}
                        onChange={(e) => handleOfficeId(e)}
                    >
                        {officeData.map((value) => (
                            <MenuItem value={value.officeId}>
                                {value.officeId}-{value.officeName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
            <br />
            <Tree
                lineWidth={"2px"}
                lineColor={"green"}
                lineBorderRadius={"10px"}
                label={
                    <StyledNode onClick={() => setdivision(!division)}>
                        {
                            <>
                                <b>{data?.officeLevelParam?.officeLevelDesc.toUpperCase()}: </b>{" "}
                                {data.officeName}
                                <br />
                                <span>
                  {" "}
                                    <b>No of DownLevelOffice: </b>
                                    {data?.downLevelOffice?.length}
                </span>
                            </>
                        }
                    </StyledNode>
                }
            >
                {division ? (
                    <>
                        {data.downLevelOffice && data.downLevelOffice != 0 ? (
                            <ChildNodes
                                data={data.downLevelOffice}
                                agentData={data?.agents}
                                parentNode={data.officeName}
                            />
                        ) : null}
                    </>
                ) : null}
            </Tree>
        </div>
    );
}

export default MainTree;
