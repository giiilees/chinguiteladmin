import { create } from "apisauce";

const apiClient = create({
  baseURL: "http://192.168.42.124:6700/api/",
  timeout: 25000,
});

const nextClient = create({
  baseURL: "/api/",
  timeout: 25000,
});

export default { apiClient, nextClient };
