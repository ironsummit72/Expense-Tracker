import axios from "axios";
const AxiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true, // TODO: later use process.env
});
export default AxiosInstance;
