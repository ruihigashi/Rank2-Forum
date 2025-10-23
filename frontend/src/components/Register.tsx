
import { useState } from "react";
import { createUser } from "../api/User";
import { useNavigate } from "react-router-dom";

export default function Register() {

    const [userName, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const onRegisterClick = async () => {
        // 登録画面にて、入力した内容をbackendに渡して処理が成功すればログイン画面に戻る処理
        try {
            await createUser(userName, email, password);
            navigate('/');
        } catch (err) {
            // 登録失敗した際にコンソールにエラーを表示
            console.error('登録に失敗しました', err); 
        }
    }

    return (
        <div>
            <div className="flex items-center justify-center min-h-screen ">
                <div className="bg-gray-50 p-8 rounded-2xl shadow-xl w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-6 text-center">新規登録</h2>
                    <div className="mb-4">
                        <label htmlFor="id" className="block text-gray-700 mb-1">ユーザー名</label>
                        <input
                            id="id"
                            type="text"
                            value={userName}
                            onChange={(evt) => setName(evt.target.value)}
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-300"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 mb-1">メールアドレス</label>
                        <input
                            id="password"
                            type="email"
                            value={email}
                            onChange={(evt) => setEmail(evt.target.value)}
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-300"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 mb-1">パスワード</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(evt) => setPassword(evt.target.value)}
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-300"
                        />
                    </div>
                    <button
                        type="button"
                        onClick={onRegisterClick}
                        className="w-full bg-gray-900 hover:bg-gray-700 text-white font-semibold py-2 px-4 mt-2 rounded transition"
                    >
                        登録
                    </button>
                </div>
            </div>
        </div>
    )
}