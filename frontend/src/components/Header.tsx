import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { UserContext } from "../providers/UserProvider";
import { getUser } from "../api/User";
import logoutImg from "../asset/img/LogoutButton.png";
import userDetail from "../asset/img/userDetailButton.png"
import UserDetailModal from "./UserDetailModal";

export default function Header() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    // モーダル表示のための状態を追加
    const [showModal, setShowModal] = useState(false);
    // モーダル内で表示するユーザー詳細を保持する状態
    const [userDetails, setUserDetails] = useState<any>(null);
    const { userInfo, setUserInfo } = useContext(UserContext);

    const logout = () => {
        setUserInfo({ id: 0, token: "" });
        navigate("/");
    }

    useEffect(() => {
        const myGetUser = async () => {
            try {
                const user = await getUser(userInfo.id, userInfo.token);
                setUserName(user.name);
            } catch (err) {
                console.error('ユーザー取得エラー', err);
                setUserName("");
            }
        };
        myGetUser();
    }, [userInfo.id, userInfo.token]);

    // ユーザー詳細ボタンが押されたときにモーダルを開く処理
    const openUserModal = async () => {
        try {
            // ここでバックエンドからユーザー情報を取得して表示する
            const user = await getUser(userInfo.id, userInfo.token);
            setUserDetails(user);
            setShowModal(true);
        } catch (err) {
            console.error('ユーザー詳細取得エラー', err);
            alert('ユーザー情報の取得に失敗しました');
        }
    }

    // モーダルを閉じる処理
    const closeUserModal = () => {
        setShowModal(false);
        setUserDetails(null);
    }

    return (
        <>
            <div className="w-full h-16 flex items-center justify-between bg-gray-900 text-white px-6">
                <span className="text-2xl font-semibold">MicroPost</span>

                <div className="flex items-center gap-3">
                    <span className="text-xl whitespace-nowrap">
                        <button className="w-8 h-7" onClick={openUserModal}>
                            <img src={userDetail} alt="ユーザー詳細ボタン" />
                        </button>
                    </span>
                    <button onClick={logout} className="p-1 rounded hover:bg-gray-800">
                        <img src={logoutImg} alt="ログアウト" className="w-6 h-6 object-contain" />
                    </button>
                </div>
            </div>

            <UserDetailModal show={showModal} onClose={closeUserModal} userDetails={userDetails} onUpdated={(u:any)=>{ setUserName(u.name); }} token={userInfo.token} />
        </>
    );
}