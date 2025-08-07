import axios from "axios";

const BASE_URL = "http://localhost:5000/products";

export const getAllProducts = async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

export const getProductById = async (id) => {
  const res = await axios.get(`${BASE_URL}/${id}`);
  return res.data;
};

export const createProduct = async (product) => {
  const res = await axios.post(BASE_URL, product);
  return res.data;
};

export const updateProduct = async (id, product) => {
  const res = await axios.put(`${BASE_URL}/${id}`, product);
  return res.data;
};

export const deleteProduct = async (id) => {
  const res = await axios.delete(`${BASE_URL}/${id}`);
  return res.data;
};

