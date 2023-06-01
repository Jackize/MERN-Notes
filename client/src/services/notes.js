import axios from 'axios';
const baseUrl = `${process.env.REACT_APP_API_URL}/api/notes`;

let token = null;

const setToken = (newToken) => {
    token = `bearer ${newToken}`;
};

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then((response) => response.data);
};

const create = async (newObject) => {
    const config = {
        headers: { Authorization: token },
    };

    const response = await axios.post(baseUrl, newObject, config);
    return response.data;
};

const update = async (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject);
    const response = await request;
    return response.data;
};

export default { getAll, create, update, setToken };
