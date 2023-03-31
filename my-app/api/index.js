import axios from "axios";
const API = axios.create({ baseURL: 'http://localhost:5000'} );

export const fetchShares = () => API.get('/shares');
export const createShares = (newShares) => API.post('/shares', newShares);
