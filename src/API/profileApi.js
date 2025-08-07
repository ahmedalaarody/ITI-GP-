import axios from "axios";

const BASE_URL = "http://localhost:5000/profile";

export const getProfile = async () => {
  const res = await axios.get(BASE_URL);
  console.log({ res });
  return res.data;
};
