import axios from "axios";

const service = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
});

//send token in ALL requests (safely)

service.interceptors.request.use((req) => {
//get request and add info before it is sent

  const token = localStorage.getItem("authToken");

//if exists, add it with that word we got before in our tokem
  if (token) {
    req.headers.authorization = `Bearer ${token}`;
  }
  return req;
});

export default service;
