import axios from "axios";

const post = async (user_id: string, token: string, msg: string) => {
    const data = {
        message: msg
    };
    const url = `http://localhost:5433/post?user_id=${user_id}&token=${token}`;
    const res = await axios.post(url, data);
    console.log(res);
    
}

    const getList = async (token: string) => {
        const url = `http://43.207.191.124:3001/post?token=${token}&records=10`;
        const res = await axios.get(url);
        return res.data;
    }

export { post, getList }
