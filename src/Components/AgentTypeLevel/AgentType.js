import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./AgentType.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
//import AddBoxIcon from "@mui/icons-material/AddBox";
import { Button } from "@mui/material";
import AgentTypeAdd from "./AgentTypeAdd";
import AgentTypeEdit from "./AgentTypeEdit";
import AgentTypeInfo from "./AgentTypeInfo";
import InfoIcon from '@mui/icons-material/Info';


var initialValues = {
    id:"",
    agentLevelDesc:"",
    agentLevelId:"",
    isValid:"",
};

function AgentType(){
    const [agentTypeData, setagentTypeData] = useState(initialValues);  
    const [data, setData] = useState([]);
    const [record, setRecord] = useState("");
    const [info, setInfo] = useState("");

    const [open, setOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const[infoOpen, setInfoOpen] = useState(false); 

    //Add
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClickClose = () => {
      setOpen(false);
    };

    //Edit
   
    const editClickOpen = (item) => {
      setRecord(item);
      setEditOpen(true);
    };
    const editClickClose = () => {
      setEditOpen(false);
    };

    //Info
    const infoClickOpen = (item) => {
      setInfo(item);
      setInfoOpen(true);
    };
    const infoClickClose = () => {
      setInfoOpen(false);
    };

    //Add
      const handleChange = (e) => {
        const { value, name } = e.target;
        setagentTypeData({ ...agentTypeData, [name]: value });
      };

    //Edit
    const editChange = (e) => {
      const { value, name } = e.target;
      setRecord({ ...record, [name]: value });
    };


    //GET 
      const getdata = () => {
        axios
            .get(`http://localhost:8080/agentType/getall`)
            .then((resp) => {
            console.log(resp);
            setData(resp.data);
            })
            .catch((err) => console.log(err));
        };

      // //POST
      //   const handleFormSubmit = () => {
      //     axios
      //       .post(`http://localhost:8080/agentType/add`, agentTypeData)
      //       .then((resp) => {
      //         console.log(resp);
      //         handleClickClose();
      //         getdata();
      //         setagentTypeData(initialValues);
      //         alert("Agent Type level Added Succesfully");
      //       });
      //   };

      //PATCH - update

      const editFormSubmit = () => {
        const confirm = window.confirm(
          "Are you sure, you want to update this row"
        );
        if (confirm) { 
        axios
          .patch(`http://localhost:8080/agentType/${record.id}`, record)
          .then((resp) => {
            console.log(resp);
            editClickClose();            
            getdata();          
            alert("Agent Type level Updated Succesfully");           
          });
        }
      };

      //DELETE - Soft
      const handleDelete = (oldData) => {
        const confirm = window.confirm(
          "Are you sure, you want to delete this row",
          oldData
        );
        if (confirm) {   
          axios.patch(`http://localhost:8080/agentType/softDelete/${oldData}`).then((resp) => {
          console.log(resp);
          getdata();
          alert("Agent Type level Deleted Succesfully");
        });
        }       
      };

        useEffect(() => {
            getdata();
          }, []);


return (
    <div>
        
        <h2
           style={{
             backgroundColor: "Violet",
             fontSize: '2.5 rem',
             fontWeight: 'bold',
             color: "black",
             textAlign: "center",
           }}
         >
           Agenct Type Level Information
         </h2>

         <Paper className="paperDesign" elevation={12}>
         <Button color="primary" variant="contained" onClick={handleClickOpen}>
          Add
        </Button>

         <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead className="tableHeader">
              <TableRow> 
                <TableCell>Id</TableCell>
                <TableCell>AgentLevel Desc</TableCell>
                <TableCell>AgentLevelId</TableCell>
                {/* <TableCell>IsValid</TableCell> */}
                <TableCell>Action</TableCell>  

            </TableRow>
            </TableHead>
            <TableBody>
            {(data).map((value, index) => (
            <TableRow>
                  <TableCell>{value.id}</TableCell>
                  <TableCell>{value.agentLevelDesc}</TableCell>
                  <TableCell>{value.agentLevelId}</TableCell>
                  {/* <TableCell>{value.isValid}</TableCell> */}
                  <TableCell>
                    <div style={{ display: "flex" }}>
                      <EditIcon
                        color="primary"
                        onClick={() => editClickOpen(value)}
                      />
                      <DeleteIcon
                        color="error"
                        onClick={() => handleDelete(value.id)}
                      />
                      <InfoIcon    
                        onClick={() => infoClickOpen(value)}
                      />
                      </div>
                    
                    </TableCell>
                  </TableRow>
            ))} 
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        <AgentTypeAdd
        open={open}
        handleClickClose={handleClickClose}
        data={agentTypeData}
        setData = {setagentTypeData}
        getData = {getdata}
        />

        <AgentTypeEdit
        open={editOpen}
        handleClickClose={editClickClose}
        data={record}
        setData = {setRecord}
        getData = {getdata}
        // onChange={editChange}
        // handleFormSubmit={() => editFormSubmit()}
        />    
        
        <AgentTypeInfo
        open={infoOpen}
        handleClickClose={infoClickClose}
        data={info}
        />

      </div>
   );
}

export default AgentType;