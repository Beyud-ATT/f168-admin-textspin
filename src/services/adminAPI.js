import axiosBase from "./axiosBase";

const endpoint = "/admin";

async function login(data) {
  const response = await axiosBase.post(`/auth${endpoint}`, data);
  return response.data;
}

async function me() {
  const response = await axiosBase.get(`${endpoint}/me`);
  return response.data;
}

async function comments(params) {
  const response = await axiosBase.get(`${endpoint}/comments`, { params });
  return response.data;
}

async function processComment(data) {
  const response = await axiosBase.post(`${endpoint}/process-comment`, data);
  return response.data;
}

async function getRandomConfig() {
  const response = await axiosBase.get(`${endpoint}/random-config`);
  return response.data;
}

async function updateRandomConfig(data) {
  const response = await axiosBase.post(`${endpoint}/random-config`, data);
  return response.data;
}

async function getMissions() {
  const response = await axiosBase.get(`${endpoint}/missions`);
  return response.data;
}

async function createMission(data) {
  const response = await axiosBase.post(`${endpoint}/mission`, data);
  return response.data;
}

async function deleteMission(id) {
  const response = await axiosBase.delete(`${endpoint}/mission/${id}`);
  return response.data;
}

async function getUsers(params) {
  const response = await axiosBase.get(`${endpoint}/users`, { params });
  return response.data;
}

async function getUsersCode(userId) {
  const response = await axiosBase.get(`${endpoint}/user-codes/${userId}`);
  return response.data;
}

async function getStaticUsers() {
  const response = await axiosBase.get(`${endpoint}/static-users`);
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
  getStaticUsers,
};
