import axoisBase from "./axiosBase";

const endpoint = "/admin";

async function login(data) {
  const response = await axoisBase.post(`${endpoint}/login`, data);
  return response.data;
}

async function me() {
  const response = await axoisBase.get(`${endpoint}/me`);
  return response.data;
}

async function comments(params) {
  const response = await axoisBase.get(`${endpoint}/comments`, { params });
  return response.data;
}

async function processComment(data) {
  const response = await axoisBase.post(`${endpoint}/process-comment`, data);
  return response.data;
}

async function getRandomConfig() {
  const response = await axoisBase.get(`${endpoint}/random-config`);
  return response.data;
}

async function updateRandomConfig(data) {
  const response = await axoisBase.post(`${endpoint}/random-config`, data);
  return response.data;
}

async function getMissions() {
  const response = await axoisBase.get(`${endpoint}/missions`);
  return response.data;
}

async function createMission(data) {
  const response = await axoisBase.post(`${endpoint}/mission`, data);
  return response.data;
}

async function deleteMission(id) {
  const response = await axoisBase.delete(`${endpoint}/mission/${id}`);
  return response.data;
}

async function getUsers(params) {
  const response = await axoisBase.get(`${endpoint}/users`, { params });
  return response.data;
}

async function getUsersCode(userId) {
  const response = await axoisBase.get(`${endpoint}/user-codes/${userId}`);
  return response.data;
}

export {
  login,
  me,
  comments,
  processComment,
  getRandomConfig,
  updateRandomConfig,
  getMissions,
  createMission,
  deleteMission,
  getUsers,
  getUsersCode,
};
