import axios from "axios";

const BASE_URL = "http://localhost:5000";

export const loginUser = async (email, password) => {
  const res = await axios.get(`${BASE_URL}/users`, {
    params: { email, password },
  });

  if (res.data.length === 0) {
    throw new Error("Invalid email or password");
  }

  return res.data[0];
};
