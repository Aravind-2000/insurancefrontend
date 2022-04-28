import axios from "axios";

const getAllCandidates = "http://localhost:8090/candidates/getallDetails/";
const getCandidatebyid = "http://localhost:8090/candidates/get/";
const addCandidates = "http://localhost:8090/candidates/savedetails";
const updatecandidateDetails = "http://localhost:8090/candidates/update/"
const getallemployees = "http://localhost:8090/employee/getall/";
const getempbyid = "http://localhost:8090/employee/";
const paramsurl = "http://localhost:8090/param/";
const errorurl = "http://localhost:8090/error/";
const quantsbyId = "http://localhost:8090/quants/"
const updateQuants = "http://localhost:8090/quants/save";
const nameLike = "http://localhost:8090/candidates/search/name/";
const search = "http://localhost:8090/candidates/search/";
const notification = "http://localhost:8090/notification/employee/";
const getAllAddress = "http://localhost:8090/address/getall/";
const addAddress = "http://localhost:8090/address/add/";
const updateaddress = "http://localhost:8090/address/";
const allClients = "http://localhost:8090/client/getall/";
const getclient = "http://localhost:8090/client/";
const saveClient = "http://localhost:8090/client/add/";
const updateclient = "http://localhost:8090/client/"


class InsuranceApi{

     getCandidates(){
        return axios.get(getAllCandidates + sessionStorage.getItem("userid"), {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            }
        });
    }
    getcandidatebyid(id){
         return axios.get(getCandidatebyid + id + "/" + sessionStorage.getItem("userid"), {
             headers: {
                 Authorization: `Bearer ${sessionStorage.getItem("token")}`,
             }
         });
    }
    addCandidate(candidate){
         return axios.post(addCandidates, candidate);
    }
    updatecandidate(id, candidate){
         return axios.patch(updatecandidateDetails + id + "/" + sessionStorage.getItem("userid") , candidate, {
             headers: {
                 Authorization: `Bearer ${sessionStorage.getItem("token")}`,
             }
         });
    }
    getEmployees(){
         return axios.get(getallemployees + sessionStorage.getItem("userid"), {
             headers: {
                 Authorization: `Bearer ${sessionStorage.getItem("token")}`,
             }
         });
    }
    getEmployeeById(id){
         return axios.get(getempbyid + id + "/" + sessionStorage.getItem("userid"), {
             headers: {
                 Authorization: `Bearer ${sessionStorage.getItem("token")}`,
             }
         });
    }
    getParameterRule(ruleid){
         return axios.get(paramsurl + ruleid);
    }
    getError(errorid){
         return axios.get(errorurl + errorid);
    }

    getMarksById(id){
         return axios.get(quantsbyId + id, {
             headers: {
                 Authorization: `Bearer ${sessionStorage.getItem("token")}`,
             }
         });
    }
    updateQuantsDetails(value){
         return axios.post(updateQuants , value, {
             headers: {
                 Authorization: `Bearer ${sessionStorage.getItem("token")}`,
             }
         });
    }
    getNameLike(val){
         return axios.get(nameLike + val);
    }
    seacrhAll(value){
         return axios.get(search + value, {
             headers: {
                 Authorization: `Bearer ${sessionStorage.getItem("token")}`,
             }
         });
    }
    getEmployeeNotification(id){
         return axios.get(notification + id, {
             headers: {
                 Authorization: `Bearer ${sessionStorage.getItem("token")}`,
             }
         });
    }
    getAllAddress(userid){
         return axios.get(getAllAddress + userid , {
             headers: {
                 Authorization: `Bearer ${sessionStorage.getItem("token")}`,
             }
         });
    }
    saveAddress(address, userid){
         return axios.post(addAddress + userid , address, {
             headers: {
                 Authorization: `Bearer ${sessionStorage.getItem("token")}`,
             }
         });
    }
    updateAddress(id, value){
         return axios.patch(updateaddress + id +  "/" + sessionStorage.getItem("userid"), value, {
             headers: {
                 Authorization: `Bearer ${sessionStorage.getItem("token")}`,
             }
         });
    }
    getAllClients(userid){
         return axios.get(allClients + userid , {
             headers: {
                 Authorization: `Bearer ${sessionStorage.getItem("token")}`,
             }
         });
    }
    getClient(id, userid){
         return axios.get(getclient + id + "/" + userid, {
             headers: {
                 Authorization: `Bearer ${sessionStorage.getItem("token")}`,
             }
         });
    }
    addClients(client){
         const userid = sessionStorage.getItem("userid")
         return axios.post(saveClient + userid, client, {
             headers: {
                 Authorization: `Bearer ${sessionStorage.getItem("token")}`,
             }
         });
    }
    updateClient(id, client, userid){
         return axios.patch(updateclient + id + "/" + userid, client, {
             headers: {
                 Authorization: `Bearer ${sessionStorage.getItem("token")}`,
             }
         })
    }


    saveProofs(proof){
         return axios.post("http://localhost:8090/proof/add/" + sessionStorage.getItem("userid"), proof, {
             headers: {
                 Authorization: `Bearer ${sessionStorage.getItem("token")}`,
             }
         })
    }
    getAgents(userid){
         return axios.get("http://localhost:8090/agent/getall/" + userid, {
             headers: {
                 Authorization: `Bearer ${sessionStorage.getItem("token")}`,
             }
         })
    }

    deleteAgent(id, userid){
         return axios.patch( `http://localhost:8090/agent/delete/${id}/${userid}` , {}, {
             headers: {
                 Authorization: `Bearer ${sessionStorage.getItem("token")}`,
             }
         })
    }

    saveAgent(agent){

         const userid = sessionStorage.getItem("userid")
         return axios.post("http://localhost:8090/agent/add/" + userid, agent, {
             headers: {
                 Authorization: `Bearer ${sessionStorage.getItem("token")}`
             }
         })
    }

    updateAgent(id, agent){

         const userid = sessionStorage.getItem("userid")

         return axios.patch(`http://localhost:8090/agent/${id}/${userid}`, agent, {
             headers: {
                 Authorization: `Bearer ${sessionStorage.getItem("token")}`
             }
         })
    }
    getAllAgentType(){
         return axios.get("http://localhost:8090/agentType/getall")
    }
    getAllOfficeLevels(){
         return axios.get("http://localhost:8090/officeLevel/getall")
    }

    getAllServices(){
         return axios.get(`http://localhost:8090/service/getall`)
    }

    getAllPermissionMethods(){
         return axios.get(`http://localhost:8090/permission/methods`)
    }

    addPermission(permissions){
         const userid = sessionStorage.getItem("userid")
         return axios.post(`http://localhost:8090/permission/add/${userid}`, permissions, {
             headers: {
                 Authorization: `Bearer ${sessionStorage.getItem("token")}`
             }
         })
    }

    doPromoteOrDemote(details){
         const userid = sessionStorage.getItem("userid")
        return axios.post(`http://localhost:8090/promote/add/${userid}`, details, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`
            }
        })
    }

    getAllTrainings(){
         const userid = sessionStorage.getItem("userid")
        return axios.get(`http://localhost:8090/training/getall/${userid}`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`
            }
        })
    }

    getTraining(id){
         const userid = sessionStorage.getItem("userid")
        return axios.get(`http://localhost:8090/training/${id}/${userid}`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`
            }
        })
    }

    addTraining(details){
         const userid = sessionStorage.getItem("userid")
        return axios.post(`http://localhost:8090/training/add/${userid}`, details, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`
            }
        })
    }

    updateTraining(id, details){
        const userid = sessionStorage.getItem("userid")
        return axios.patch(`http://localhost:8090/training/${id}/${userid}`, details, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`
            }
        })
    }

    deactivateTraining(id){
         const userid = sessionStorage.getItem("userid")
        return axios.patch(`http://localhost:8090/training/softdelete/${id}/${userid}`, {}, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`
            }
        })
    }


}

export default new InsuranceApi();