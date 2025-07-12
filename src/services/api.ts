import axios from 'axios';

const API = 'http://localhost:5000';

export const getAllProducts = () => axios.get(`${API}/products`);
export const getProductById = (id: string) => axios.get(`${API}/products/${id}`);
export const submitFeedback = (feedback: { productId: string; name: string; message: string }) => axios.post(`${API}/feedback`, feedback);
export const getFeedbackByProduct = (productId: string) => axios.get(`${API}/feedback/${productId}`);
