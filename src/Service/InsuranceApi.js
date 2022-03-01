import axios from "axios";

const getAllCandidates = "http://localhost:8090/candidates/getallDetails";
const getCandidatebyid = "http://localhost:8090/candidates/get/";
const addCandidates = "http://localhost:8090/candidates/savedetails";
const updatecandidateDetails = "http://localhost:8090/candidates/update/"
const getallemployees = "http://localhost:8090/employee/getall";
const getempbyid = "http://localhost:8090/employee/";
const paramsurl = "http://localhost:8090/param/";
const errorurl = "http://localhost:8090/error/";
const quantsbyId = "http://localhost:8090/quants/"
const updateQuants = "http://localhost:8090/quants/save";
const nameLike = "http://localhost:8090/candidates/search/name/";
const search = "http://localhost:8090/candidates/search/";


class InsuranceApi{

     getCandidates(){
        return axios.get(getAllCandidates);
    }
    getcandidatebyid(id){
         return axios.get(getCandidatebyid + id);
    }
    addCandidate(candidate){
         return axios.post(addCandidates, candidate);
    }
    updatecandidate(id, candidate){
         return axios.patch(updatecandidateDetails + id, candidate);
    }
    getEmployees(){
         return axios.get(getallemployees);
    }
    getEmployeeById(id){
         return axios.get(getempbyid + id);
    }
    getParameterRule(ruleid){
         return axios.get(paramsurl + ruleid);
    }
    getError(errorid){
         return axios.get(errorurl + errorid);
    }
    getMarksById(id){
         return axios.get(quantsbyId + id);
    }
    updateQuantsDetails(value){
         return axios.post(updateQuants , value);
    }
    getNameLike(val){
         return axios.get(nameLike + val);
    }
    seacrhAll(value){
         return axios.get(search + value);
    }
}

export default new InsuranceApi();