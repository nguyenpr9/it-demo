import apiService from "./apiService";

export const getAuthToken = () => {
  return localStorage.getItem("authToken");
};
export const getVerifyAccount = () => {
  return localStorage.getItem("isVerified");
};
export const removeAuthToken = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("isVerified");
};
export const setAuthToken = (authToken) => {
  localStorage.setItem("authToken", authToken);
};
export const setVerifyAccount = () => {
  localStorage.setItem("isVerified", true);
};

export const login = (credentials) => {
  return apiService.post("/auth/authenticate", credentials);
};

export const generateOTP = (userInfo) => {
  return apiService.post("/auth/sent-otp", userInfo);
};

export const verifyOTP = (otpInfo) => {
  return apiService.post(`/auth/verify-otp?otp=${otpInfo}`);
};
