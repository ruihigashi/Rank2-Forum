import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_HOST || "http://localhost:3000";

const getUser = async (user_id: number, token: string) => {
    const url = `${API_BASE_URL}/user/${user_id}?token=${token}`;
    const res = await axios.get(url);
    return res.data;
}


const createUser = async (name: string, email: string, password: string) => {
    const url = `${API_BASE_URL}/user`;
    const res = await axios.post(url, { name, email, password });
    return res.data;
}

const updateUser = async (name: string, email: string, created_at: string, token: string, user_id: number) => {
    const url = `${API_BASE_URL}/user/update`;
    const res = await axios.post(url, { name, email, created_at, id: user_id, token });
    return res.data;
}

export { getUser, createUser, updateUser };