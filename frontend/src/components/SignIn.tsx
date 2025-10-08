import { useState, useContext } from "react"

import { sign_in } from '../api/Auth';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../providers/UserProvider";

export default function SignIn() {
    const navigate = useNavigate(); // navigateオブジェクトの作成
    const [userName, setUserId] = useState(''); // ユーザーIDを保持するstate
    const [password, setPass] = useState(''); // パスワードを保持するstate
    const { setUserInfo } = useContext(UserContext); //setUserInfoの取り出し

    const onSignInClick = async () => {
        try {
            const ret = await sign_in(userName, password);
            if (ret && ret.token) {
                // setUserInfoを使用してコンテキストにユーザー情報を保存する
                setUserInfo({
                    id: ret.user_id,
                    token: ret.token,
                });
                navigate('/main'); // メイン画面に遷移
            } else {
                console.error('Sign in failed: no token in response', ret);
            }
        } catch (err) {
            console.error('Sign in error', err);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen ">
            <div className="bg-gray-50 p-8 rounded-2xl shadow-xl w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">サインイン</h2>
                <div className="mb-4">
                    <label htmlFor="id" className="block text-gray-700 mb-1">ユーザー名</label>
                    <input
                        id="id"
                        value={userName}
                        type="text"
                        onChange={(evt) => setUserId(evt.target.value)}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-300"
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block text-gray-700 mb-1">パスワード</label>
                    <input
                        id="password"
                        value={password}
                        type="password"
                        onChange={(evt) => setPass(evt.target.value)}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-300"
                    />
                </div>
                <button
                    type="button"
                    onClick={onSignInClick}
                    className="w-full bg-gray-900 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded transition"
                >
                    ログイン
                </button>
                <button
                    type="button"
                    onClick={() => {navigate("/register")}}
                    className="w-full hover:bg-gray-900 hover:text-white text-brack font-semibold py-2 px-4 mt-2 rounded transition border-gray-400 border-2" 
                >
                    新規登録
                </button>
            </div>
        </div>
    )
}
