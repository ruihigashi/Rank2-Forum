import axios from "axios";

export default function Post() {
    const getList = async (token: string) => {
        const url = 'http://<サーバアドレス>:3001/post?token=${token}&records=10';
        const res = await axios.get(url);
        return res.data;
    }
};