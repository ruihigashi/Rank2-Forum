import axios from "axios";

export const sign_in = async (user_id: string, pass: string) => {
    const url = `http://localhost:3000/auth?user_id=${encodeURIComponent(user_id)}&password=${encodeURIComponent(pass)}`;
    const res = await axios.get(url);
    return res.data;
}
