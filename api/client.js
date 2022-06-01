import { create } from "apisauce";

const apiClient = create({
  baseURL: "https://chinguitel.herokuapp.com/api/",
  timeout: 25000,
});

const nextClient = create({
  baseURL: "/api/",
  timeout: 25000,
});

export default { apiClient, nextClient };
