import axios from "axios";

    export const sign_in = async (user_id: string, pass: string) => {
        const url = `http://<サーバーのIPアドレス>:3001/auth?user_id=${user_id}&pass=${pass}`;
        console.log(url);
        const res = await axios.get(url)
        console.log(res);
    }
