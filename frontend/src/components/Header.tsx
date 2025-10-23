import { useContext, useEffect, useState } from "react";
import { getUser } from "../api/User";
import userDetail from "../asset/img/userDetailButton.png";
import { UserContext } from "../providers/UserProvider";
import LogoutButton from "./LogoutButton";
import UserDetailModal from "./UserDetailModal";
import { UserType } from "../types/User";

export default function Header() {
    const [userName, setUserName] = useState("");
    // モーダル表示のための状態を追加
    const [showModal, setShowModal] = useState(false);
    // モーダル内で表示するユーザー詳細を保持する状態
    const [userDetails, setUserDetails] = useState<UserType | null>(null);
    const { userInfo } = useContext(UserContext);

    useEffect(() => {
        const myGetUser = async () => {
            try {
                const user = await getUser(userInfo.id, userInfo.token);
                setUserName(user.name);
            } catch (err) {
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
                    <LogoutButton />
                </div>
            </div>

            <UserDetailModal show={showModal} onClose={closeUserModal} userDetails={userDetails} onUpdated={(u: UserType)=>{ setUserName(u.name); }} token={userInfo.token} />
        </>
    );
}