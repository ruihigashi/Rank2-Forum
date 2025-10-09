import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { UserContext } from "../providers/UserProvider";
import { getUser } from "../api/User";
import logoutImg from "../asset/img/LogoutButton.png";
import userDetail from "../asset/img/userDetailButton.png"

export default function Header() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const { userInfo, setUserInfo } = useContext(UserContext);

    const logout = () => {
        setUserInfo({ id: 0, token: "" });
        navigate("/");
    }

    useEffect(() => {
        const myGetUser = async () => {
            const user = await getUser(userInfo.id, userInfo.token);
            setUserName(user.name);
        };
        myGetUser();
    }, []);

    return (
        <div className="w-full h-16 flex items-center justify-between bg-gray-900 text-white px-6">
            <span className="text-2xl font-semibold">MicroPost</span>

            <div className="flex items-center gap-3">
                <span className="text-xl whitespace-nowrap">
                    <button className="w-8 h-7" >
                        <img src={userDetail} alt="ユーザー詳細ボタン" />
                    </button>
                </span>
                <button onClick={logout} className="p-1 rounded hover:bg-gray-800">
                    <img src={logoutImg} alt="ログアウト" className="w-6 h-6 object-contain" />
                </button>
            </div>
        </div>
    )
}