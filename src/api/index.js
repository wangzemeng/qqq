import axios from "axios";
import { isDev } from "../helper/NetworkHelper";

// const baseUrl = isDev() ? "/api" : 'https://api-boss.chehejia.com';
const baseUrl = isDev() ? "/test-api" : 'https://iot-api-boss-test.chehejia.com';

axios.defaults.timeout = 30000;

const CancelToken = axios.CancelToken;


export const getSystemList = async (params) => {
  return await axios.post(`${baseUrl}/fed-appmonitor-service/api/channel/getProjectAccessData`, params);
}

export const addProjectRemark = async (params) => {
  return await axios.post(`${baseUrl}/fed-appmonitor-service/api/channel/addProjectRemark`, params);
}

export const getAreaOptionList = async () => {
  return await axios.get(`${baseUrl}/fed-appmonitor-service/api/area/getList`);
}

export const getTotalNumber = async (params) => {
  return await axios.post(`${baseUrl}/fed-appmonitor-service/api/channel/getProjectAccessDataCount`, params);
}

