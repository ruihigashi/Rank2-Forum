import axios from "axios";

const getUser = async (user_id: number, token: string) => {
    const url = `http://localhost:3000/user/${user_id}?token=${token}`;
    const res = await axios.get(url);
    return res.data;
}


const createUser = async (name: string, email: string, password: string) => {
    const url = `http://localhost:3000/user`;
    const res = await axios.post(url, { name, email, password });
    return res.data;
}

export { getUser, createUser };