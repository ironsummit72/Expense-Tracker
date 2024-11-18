import axios from "axios";
const AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true, // TODO: later use process.env
});
export default AxiosInstance;
