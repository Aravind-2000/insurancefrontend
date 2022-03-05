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
const notification = "http://localhost:8090/notification/employee/";
const getAllAddress = "http://localhost:8090/address/getall";
const addAddress = "http://localhost:8090/address/add";
const updateaddress = "http://localhost:8090/address/";
const allClients = "http://localhost:8090/client/getall";
const getclient = "http://localhost:8090/client/";
const saveClient = "http://localhost:8090/client/add";
const updateclient = "http://localhost:8090/client/"


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
    getEmployeeNotification(id){
         return axios.get(notification + id);
    }
    getAllAddress(){
         return axios.get(getAllAddress);
    }
    saveAddress(address){
         return axios.post(addAddress , address);
    }
    updateAddress(id, value){
         return axios.patch(updateaddress + id , value);
    }
    getAllClients(){
         return axios.get(allClients);
    }
    getClient(id){
         return axios.get(getclient + id);
    }
    addClients(client){
         return axios.post(saveClient, client);
    }
    updateClient(id, client){
         return axios.patch(updateclient + id, client)
    }



}

export default new InsuranceApi();