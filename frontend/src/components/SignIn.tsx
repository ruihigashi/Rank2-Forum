import { useState, useContext } from "react"

import { sign_in } from '../api/Auth';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../providers/UserProvider"; 

export default function SignIn() {
    const navigate = useNavigate(); // navigateオブジェクトの作成
    const [userId, setUserId] = useState(''); // ユーザーIDを保持するstate
    const [pass, setPass] = useState(''); // パスワードを保持するstate
    const { setUserInfo } = useContext(UserContext); //setUserInfoの取り出し

    const onSignInClick = async() => {
        const ret = await sign_in(userId, pass);
        
        if (ret && ret.token) {
            // setUserInfoを使用してコンテキストにユーザー情報を保存する
            setUserInfo({
                id: ret.user_id, 
                token: ret.token,
            });
            navigate('/main'); // メイン画面に遷移
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-gray-100 p-8 rounded shadow-md w-full max-w-xs">
                <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
                <div className="mb-4">
                    <label htmlFor="id" className="block text-gray-700 mb-1">ID</label>
                    <input
                        id="id"
                        value={userId}
                        type="text"
                        onChange={(evt) => setUserId(evt.target.value)}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block text-gray-700 mb-1">Password</label>
                    <input
                        id="password"
                        value={pass}
                        type="password"
                        onChange={(evt) => setPass(evt.target.value)}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <button
                    type="button"
                    onClick={onSignInClick}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition"
                >
                    Login
                </button>
            </div>
        </div>
    )
}
