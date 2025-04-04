export const BASE_URL = "http://localhost:8000";

// utils/apiPaths.js
export const API_PATHS = {
 
  DASHBOARD: {
    GET_DATA: "/api/v1/dashboard",
  },

  EXPENSE:{
    ADD_EXPENSE: "/api/v1/expense/add",
    GET_ALL_EXPENSE: "/api/v1/expense/get",
    DELETE_EXPENSE: (expenseId) =>  `/api/v1/expense/${expenseId}`,
    DOWNLOAD_EXPENSE: `/api/v1/expense/downloadexcel`,
  },

};
