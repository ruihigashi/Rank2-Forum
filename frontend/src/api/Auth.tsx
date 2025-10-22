import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_HOST || "http://localhost:3000";

export const sign_in = async (user_id: string, pass: string) => {
    const url = `${API_BASE_URL}/auth?user_id=${encodeURIComponent(user_id)}&password=${encodeURIComponent(pass)}`;
    const res = await axios.get(url);
    return res.data;
}
