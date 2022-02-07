import axios from "axios";

const getAllCandidates = "http://localhost:8090/candidates/getallDetails";
const addCandidates = "http://localhost:8090/candidates/savedetails";
const getallemployees = "http://localhost:8090/employee/getall";
const getempbyid = "http://localhost:8090/employee/";


class InsuranceApi{

     getCandidates(){
        return axios.get(getAllCandidates);
    }
    addCandidate(candidate){
         return axios.post(addCandidates, candidate);
    }
    getEmployees(){
         return axios.get(getallemployees);
    }
    getEmployeeById(id){
         return axios.get(getempbyid + id);
    }
}

export default new InsuranceApi();