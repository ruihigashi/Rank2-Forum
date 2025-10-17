import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import logoutImg from "../asset/img/LogoutButton.png";
import { UserContext } from "../providers/UserProvider";

export default function LogoutButton() {
    const navigate = useNavigate();
    const { setUserInfo } = useContext(UserContext);

    const logout = () => {
        // ユーザー情報をリセットしてログアウト
        setUserInfo({ id: 0, token: "" });
        navigate("/");
    }

    return (
        <button onClick={logout} className="p-1 rounded hover:bg-gray-800">
            <img src={logoutImg} alt="ログアウト" className="w-6 h-6 object-contain" />
        </button>
    )
}