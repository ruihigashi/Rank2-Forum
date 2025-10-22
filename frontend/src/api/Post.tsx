import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_HOST || "http://localhost:3000";


const post = async (user_id: string, token: string, msg: string) => {
    const data = {
        message: msg
    };
    const url = `${API_BASE_URL}/post?user_id=${user_id}&token=${token}`;
    const res = await axios.post(url, data);
    console.log(res);

}

const getList = async (token: string, page: number = 1) => {
    const url = `${API_BASE_URL}/post?token=${token}&records=10&page=${page}`;
    const res = await axios.get(url);
    return res.data;
};

const deletePost = async (id: number, token: string) => {
    const url = `${API_BASE_URL}/post?id=${id}&token=${token}`;
    const res = await axios.delete(url);
    return res.data;
}

export { post, getList, deletePost }
