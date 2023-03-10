import axios from "axios";

const getAllCandidates = "http://localhost:8090/candidates/getallDetails/";
const getCandidatebyid = "http://localhost:8090/candidates/get/";
const addCandidates = "http://localhost:8090/candidates/savedetails";
const updatecandidateDetails = "http://localhost:8090/candidates/update/";
const getallemployees = "http://localhost:8090/employee/getall/";
const getempbyid = "http://localhost:8090/employee/";
const paramsurl = "http://localhost:8090/param/";
const errorurl = "http://localhost:8090/error/";
const quantsbyId = "http://localhost:8090/quants/";
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
const updateclient = "http://localhost:8090/client/";

class InsuranceApi {
  getCandidates() {
    return axios.get(getAllCandidates + sessionStorage.getItem("userid"), {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  }
  getcandidatebyid(id) {
    return axios.get(
      getCandidatebyid + id + "/" + sessionStorage.getItem("userid"),
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
  }
  addCandidate(candidate) {
    return axios.post(addCandidates, candidate);
  }
  updatecandidate(id, candidate) {
    return axios.patch(
      updatecandidateDetails + id + "/" + sessionStorage.getItem("userid"),
      candidate,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
  }
  getEmployees() {
    return axios.get(getallemployees + sessionStorage.getItem("userid"), {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  }

  addEmployee(body) {
    const userid = sessionStorage.getItem("userid");
    return axios.post(`http://localhost:8090/employee/add/${userid}`, body, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  }

  updateEmployee(id, body) {
    const userid = sessionStorage.getItem("userid");
    return axios.patch(`http://localhost:8090/employee/${id}/${userid}`, body, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  }

  getEmployeeById(id) {
    return axios.get(getempbyid + id + "/" + sessionStorage.getItem("userid"), {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  }
  getParameterRule(ruleid) {
    return axios.get(paramsurl + ruleid);
  }
  getError(errorid) {
    return axios.get(errorurl + errorid);
  }

  getMarksById(id) {
    return axios.get(quantsbyId + id, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  }
  updateQuantsDetails(value) {
    return axios.post(updateQuants, value, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  }
  getNameLike(val) {
    return axios.get(nameLike + val);
  }
  seacrhAll(value) {
    return axios.get(search + value, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  }
  getEmployeeNotification(id) {
    return axios.get(notification + id, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  }
  getAllAddress(userid) {
    return axios.get(getAllAddress + userid, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  }
  saveAddress(address, userid) {
    return axios.post(addAddress + userid, address, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  }
  updateAddress(id, value) {
    return axios.patch(
      updateaddress + id + "/" + sessionStorage.getItem("userid"),
      value,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
  }
  getAllClients(userid) {
    return axios.get(allClients + userid, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  }
  getClient(id, userid) {
    return axios.get(getclient + id + "/" + userid, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  }
  addClients(client) {
    const userid = sessionStorage.getItem("userid");
    return axios.post(saveClient + userid, client, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  }
  updateClient(id, client, userid) {
    return axios.patch(updateclient + id + "/" + userid, client, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  }

  saveProofs(proof) {
    return axios.post(
      "http://localhost:8090/proof/add/" + sessionStorage.getItem("userid"),
      proof,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
  }
  getAgents(userid) {
    return axios.get("http://localhost:8090/agent/getall/" + userid, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  }

  getAgentsByOffice(id) {
    return axios.get(`http://localhost:8090/agent/office/${id}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  }

  deleteAgent(id, userid) {
    return axios.patch(
      `http://localhost:8090/agent/delete/${id}/${userid}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
  }

  saveAgent(agent) {
    const userid = sessionStorage.getItem("userid");
    return axios.post("http://localhost:8090/agent/add/" + userid, agent, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  }

  updateAgent(id, agent) {
    const userid = sessionStorage.getItem("userid");

    return axios.patch(`http://localhost:8090/agent/${id}/${userid}`, agent, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  }
  getAllAgentType() {
    return axios.get("http://localhost:8090/agentType/getall");
  }
  getAllOfficeLevels() {
    return axios.get("http://localhost:8090/officeLevel/getall");
  }

  getAllServices() {
    return axios.get(`http://localhost:8090/service/getall`);
  }

  getAllPermissionMethods() {
    return axios.get(`http://localhost:8090/permission/methods`);
  }

  addPermission(permissions) {
    const userid = sessionStorage.getItem("userid");
    return axios.post(
      `http://localhost:8090/permission/add/${userid}`,
      permissions,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
  }

  doPromoteOrDemote(details) {
    const userid = sessionStorage.getItem("userid");
    return axios.post(`http://localhost:8090/promote/add/${userid}`, details, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  }

  getAllTrainings() {
    const userid = sessionStorage.getItem("userid");
    return axios.get(`http://localhost:8090/training/getall/${userid}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  }

  getTraining(id) {
    const userid = sessionStorage.getItem("userid");
    return axios.get(`http://localhost:8090/training/${id}/${userid}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  }

  addTraining(details) {
    const userid = sessionStorage.getItem("userid");
    return axios.post(`http://localhost:8090/training/add/${userid}`, details, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  }

  updateTraining(id, details) {
    const userid = sessionStorage.getItem("userid");
    return axios.patch(
      `http://localhost:8090/training/${id}/${userid}`,
      details,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
  }

  deactivateTraining(id) {
    const userid = sessionStorage.getItem("userid");
    return axios.patch(
      `http://localhost:8090/training/softdelete/${id}/${userid}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
  }

  trainingDateValidation(start, end) {
    return axios.get(
      `http://localhost:8090/training/datevalidation/${start}/${end}`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
  }

  getAllAgentTrainees() {
    const userid = sessionStorage.getItem("userid");
    return axios.get(`http://localhost:8090/traineeagent/getall/${userid}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  }

  getTrainee(id) {
    const userid = sessionStorage.getItem("userid");
    return axios.get(`http://localhost:8090/traineeagent/${id}/${userid}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  }

  addTrainee(details) {
    const userid = sessionStorage.getItem("userid");
    return axios.post(
      `http://localhost:8090/traineeagent/add/${userid}`,
      details,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
  }

  updateTrainee(id, details) {
    const userid = sessionStorage.getItem("userid");
    return axios.patch(
      `http://localhost:8090/traineeagent/${id}/${userid}`,
      details,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
  }

  deactivateTrainee(id) {
    const userid = sessionStorage.getItem("userid");
    return axios.patch(
      `http://localhost:8090/traineeagent/softdelete/${id}/${userid}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
  }

  getMyTrainings(agentId) {
    const userid = sessionStorage.getItem("userid");
    return axios.get(
      `http://localhost:8090/traineeagent/myTrainings/${agentId}/${userid}`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
  }

  getAllTrainingCost() {
    const userid = sessionStorage.getItem("userid");
    return axios.get(`http://localhost:8090/trainingcost/getall/${userid}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  }

  addTrainingCost(cost) {
    const userid = sessionStorage.getItem("userid");
    return axios.post(
      `http://localhost:8090/trainingcost/add/${userid}`,
      cost,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
  }

  updateTrainingCost(id, cost) {
    const userid = sessionStorage.getItem("userid");
    return axios.patch(
      `http://localhost:8090/trainingcost/${id}/${userid}`,
      cost,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
  }

  deactivateTrainingCost(id) {
    const userid = sessionStorage.getItem("userid");
    return axios.patch(
      `http://localhost:8090/trainingcost/softdelete/${id}/${userid}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
  }

  getAllTrainingModule() {
    const userid = sessionStorage.getItem("userid");
    return axios.get(`http://localhost:8090/trainingmodule/getall/${userid}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  }

  addTrainingModule(cost) {
    const userid = sessionStorage.getItem("userid");
    return axios.post(
      `http://localhost:8090/trainingmodule/add/${userid}`,
      cost,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
  }

  updateTrainingModule(id, cost) {
    const userid = sessionStorage.getItem("userid");
    return axios.patch(
      `http://localhost:8090/trainingmodule/${id}/${userid}`,
      cost,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
  }

  deactivateTrainingModule(id) {
    const userid = sessionStorage.getItem("userid");
    return axios.patch(
      `http://localhost:8090/trainingmodule/softdelete/${id}/${userid}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
  }

  getUser(id) {
    return axios.get(`http://localhost:8090/api/auth/user/${id}`);
  }

  updateUser(id, details) {
    return axios.patch(`http://localhost:8090/api/auth/user/${id}`, details);
  }

  getOffice(id) {
    const userid = sessionStorage.getItem("userid");
    return axios.get(
      `http://localhost:8090/officestructure/getuplevel/${id}/${userid}`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
  }

  getAllCurrCodes() {
    const userid = sessionStorage.getItem("userid");
    return axios.get(`http://localhost:8090/currencycode/getall/${userid}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  }

  getCurrCode(id) {
    const userid = sessionStorage.getItem("userid");
    return axios.get(`http://localhost:8090/currencycode/${id}/${userid}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  }

  addCurrCode(code) {
    const userid = sessionStorage.getItem("userid");
    return axios.post(
      `http://localhost:8090/currencycode/add/${userid}`,
      code,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
  }

  updateCurrCode(id, code) {
    const userid = sessionStorage.getItem("userid");
    return axios.patch(
      `http://localhost:8090/currencycode/${id}/${userid}`,
      code,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
  }

  softDeleteCurrCode(id) {
    const userid = sessionStorage.getItem("userid");
    return axios.patch(
      `http://localhost:8090/currencycode/softdelete/${id}/${userid}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
  }

  getAllCurrConv() {
    const userid = sessionStorage.getItem("userid");
    return axios.get(`http://localhost:8090/currencyconv/getall/${userid}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  }

  getCurrConv(id) {
    const userid = sessionStorage.getItem("userid");
    return axios.get(`http://localhost:8090/currencyconv/${id}/${userid}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  }

  addCurrConv(conv) {
    const userid = sessionStorage.getItem("userid");
    return axios.post(
      `http://localhost:8090/currencyconv/add/${userid}`,
      conv,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
  }

  updateCurrConv(id, conv) {
    const userid = sessionStorage.getItem("userid");
    return axios.patch(
      `http://localhost:8090/currencyconv/${id}/${userid}`,
      conv,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
  }

  softDeleteCurrConv(id) {
    const userid = sessionStorage.getItem("userid");
    return axios.patch(
      `http://localhost:8090/currencyconv/softdelete/${id}/${userid}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
  }

  getAllWithin(date, orgCode, accCode) {
    return axios.get(
      `http://localhost:8090/currencyconv/getallwithin/${date}/${orgCode}/${accCode}`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
  }

  getAllTransCodes() {
    const userid = sessionStorage.getItem("userid");
    return axios.get(`http://localhost:8090/transactioncode/getall/${userid}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  }

  getTransCode(id) {
    const userid = sessionStorage.getItem("userid");
    return axios.get(`http://localhost:8090/transactioncode/${id}/${userid}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  }

  addTransCode(conv) {
    const userid = sessionStorage.getItem("userid");
    return axios.post(
      `http://localhost:8090/transactioncode/add/${userid}`,
      conv,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
  }

  updateTransCode(id, conv) {
    const userid = sessionStorage.getItem("userid");
    return axios.patch(
      `http://localhost:8090/transactioncode/${id}/${userid}`,
      conv,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
  }

  softDeleteTransCode(id) {
    const userid = sessionStorage.getItem("userid");
    return axios.patch(
      `http://localhost:8090/transactioncode/softdelete/${id}/${userid}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
  }

  getAllAccountMaster() {
    const userid = sessionStorage.getItem("userid");
    return axios.get(`http://localhost:8090/accountmaster/getall/${userid}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  }

  getAccountMaster(id) {
    const userid = sessionStorage.getItem("userid");
    return axios.get(`http://localhost:8090/accountmaster/${id}/${userid}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  }

  addAccountMaster(conv) {
    const userid = sessionStorage.getItem("userid");
    return axios.post(
      `http://localhost:8090/accountmaster/add/${userid}`,
      conv,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
  }

  updateAccountMaster(id, conv) {
    const userid = sessionStorage.getItem("userid");
    return axios.patch(
      `http://localhost:8090/accountmaster/${id}/${userid}`,
      conv,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
  }

  softDeleteAccountMaster(id) {
    const userid = sessionStorage.getItem("userid");
    return axios.patch(
      `http://localhost:8090/accountmaster/softdelete/${id}/${userid}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
  }

  getAllSubCodes() {
    return axios.get(`http://localhost:8090/accountmaster/subcodes`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  }

  getAllAccountNames() {
    return axios.get(`http://localhost:8090/accountmaster/accountnames`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  }

  getAllAccountRule() {
    const userid = sessionStorage.getItem("userid");
    return axios.get(`http://localhost:8090/accountrule/getall/${userid}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  }

  getAccountRule(id) {
    const userid = sessionStorage.getItem("userid");
    return axios.get(`http://localhost:8090/accountrule/${id}/${userid}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  }

  addAccountRule(conv) {
    const userid = sessionStorage.getItem("userid");
    return axios.post(`http://localhost:8090/accountrule/add/${userid}`, conv, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  }

  updateAccountRule(id, conv) {
    const userid = sessionStorage.getItem("userid");
    return axios.patch(
      `http://localhost:8090/accountrule/${id}/${userid}`,
      conv,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
  }

  softDeleteAccountRule(id) {
    const userid = sessionStorage.getItem("userid");
    return axios.patch(
      `http://localhost:8090/accountrule/softdelete/${id}/${userid}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
  }

  getAllreceiptbook() {
    const userid = sessionStorage.getItem("userid");
    return axios.get(`http://localhost:8090/receiptbook/getall/${userid}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  }

  getreceiptbook(id) {
    const userid = sessionStorage.getItem("userid");
    return axios.get(`http://localhost:8090/receiptbook/${id}/${userid}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  }

  addreceiptbook(conv) {
    const userid = sessionStorage.getItem("userid");
    return axios.post(`http://localhost:8090/receiptbook/add/${userid}`, conv, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  }

  updatereceiptbook(id, conv) {
    const userid = sessionStorage.getItem("userid");
    return axios.patch(
      `http://localhost:8090/receiptbook/${id}/${userid}`,
      conv,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
  }

  softreceiptbook(id) {
    const userid = sessionStorage.getItem("userid");
    return axios.patch(
      `http://localhost:8090/receiptbook/softdelete/${id}/${userid}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
  }

  getAlltransactionjournal() {
    const userid = sessionStorage.getItem("userid");
    return axios.get(
      `http://localhost:8090/transactionjournal/getall/${userid}`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
  }

  gettransactionjournal(id) {
    const userid = sessionStorage.getItem("userid");
    return axios.get(
      `http://localhost:8090/transactionjournal/${id}/${userid}`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
  }

  addtransactionjournal(conv) {
    const userid = sessionStorage.getItem("userid");
    return axios.post(
      `http://localhost:8090/transactionjournal/add/${userid}`,
      conv,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
  }

  updatetransactionjournal(id, conv) {
    const userid = sessionStorage.getItem("userid");
    return axios.patch(
      `http://localhost:8090/transactionjournal/${id}/${userid}`,
      conv,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
  }

  softtransactionjournal(id) {
    const userid = sessionStorage.getItem("userid");
    return axios.patch(
      `http://localhost:8090/transactionjournal/softdelete/${id}/${userid}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
  }

  myTransactions(agentid) {
    return axios.get(
      `http://localhost:8090/transactionjournal/agent/${agentid}`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
  }

  getAllPolicyHeader() {
    const userid = sessionStorage.getItem("userid");
    return axios.get(`http://localhost:8090/policyheader/getall/${userid}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  }

  getPolicyHeader(id) {
    const userid = sessionStorage.getItem("userid");
    return axios.get(`http://localhost:8090/policyheader/${id}/${userid}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  }

  addPolicyHeader(conv) {
    const userid = sessionStorage.getItem("userid");
    return axios.post(
      `http://localhost:8090/policyheader/add/${userid}`,
      conv,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
  }

  clonePolicyHeader(conv) {
    const userid = sessionStorage.getItem("userid");
    return axios.post(
      `http://localhost:8090/policyheader/clone/${userid}`,
      conv,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
  }

  updatePolicyHeader(id, body) {
    const userid = sessionStorage.getItem("userid");
    return axios.patch(
      `http://localhost:8090/policyheader/${id}/${userid}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
  }

  softPolicyHeader(id) {
    const userid = sessionStorage.getItem("userid");
    return axios.patch(
      `http://localhost:8090/policyheader/softdelete/${id}/${userid}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
  }

  getAllPolicyCover() {
    const userid = sessionStorage.getItem("userid");
    return axios.get(`http://localhost:8090/policycover/getall/${userid}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  }

  getPolicyCover(id) {
    const userid = sessionStorage.getItem("userid");
    return axios.get(`http://localhost:8090/policycover/${id}/${userid}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  }

  getPolicyCoverByHeader(id) {
    return axios.get(`http://localhost:8090/policycover/header/${id}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  }

  addPolicyCover(conv) {
    const userid = sessionStorage.getItem("userid");
    return axios.post(`http://localhost:8090/policycover/add/${userid}`, conv, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  }

  clonePolicyCover(conv) {
    const userid = sessionStorage.getItem("userid");
    return axios.post(
      `http://localhost:8090/policycover/clone/${userid}`,
      conv,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
  }

  updatePolicyCover(id, body) {
    const userid = sessionStorage.getItem("userid");
    return axios.patch(
      `http://localhost:8090/policycover/${id}/${userid}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
  }

  softPolicyCover(id) {
    const userid = sessionStorage.getItem("userid");
    return axios.patch(
      `http://localhost:8090/policycover/softdelete/${id}/${userid}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
  }

  getAllCoverageStatus() {
    return axios.get(`http://localhost:8090/cpstatus/getall`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  }

  getAllCoverageProductNames() {
    return axios.get(`http://localhost:8090/productnames/getall`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  }

  getAllMethodsByServiceId(id) {
    return axios.get(`http://localhost:8090/methods/service/${id}`);
  }

  updateUserPassword(email, password) {
    return axios.post(`http://localhost:8090/api/auth/user/updatePassword`, {
      email,
      password,
    });
  }
}

export default new InsuranceApi();
