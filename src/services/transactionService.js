// apiService.js
import apiService from "./apiService";

export const getTransaction = (params, paginate) => {
  return apiService.post(`/api/transactions/history?${paginate}`, params);
};
