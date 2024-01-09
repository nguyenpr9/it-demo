// apiService.js
import apiService from "./apiService"; 

export const getMerchantById = (id) => {
  return apiService.get(`/api/merchants/${id}`);
};