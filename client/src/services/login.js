import axios from 'axios';
const baseUrl = process.env.REACT_APP_API_URL;

const login = async (credentials) => {
    const response = await axios.post(`${baseUrl}/api/login`, credentials);
    return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { login };
