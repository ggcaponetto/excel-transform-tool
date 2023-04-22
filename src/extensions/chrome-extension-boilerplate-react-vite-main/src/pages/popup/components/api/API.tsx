import axios from "axios";
import ExtPay from "extpay";
import * as process from "process";
const extpay = ExtPay(process.env.VITE_EXTENSIONPAY_ID);

async function getUser() {
  const user = await extpay.getUser();
  return user;
}
async function makeRequest(data) {
  const apiKey = await getApiKey();
  const user = await getUser();
  return requestPrivateAPI(user, apiKey, data);
}
async function getApiKey() {
  return new Promise((res) => {
    chrome.storage.sync.get(["extensionpay_api_key"]).then((apiKey) => {
      res(apiKey);
    });
  });
}
async function requestPrivateAPI(user, apiKey, data) {
  return axios({
    method: "post",
    url: `${process.env.VITE_SERVER_BASE_URL}/paid`,
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      user,
      apiKey,
      data,
    }),
  });
}

export default {
  makeRequest,
};
