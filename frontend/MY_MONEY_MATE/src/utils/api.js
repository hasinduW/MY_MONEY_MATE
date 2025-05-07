import axios from 'axios';

export const API_URL = 'http://localhost:5000/api/plans';

//const API_URL = "http://localhost:5000"
export const getPlans = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
