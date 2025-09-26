import { useState } from "react"

import { sign_in } from '../api/Auth';
import { useNavigate } from "react-router-dom";

export default function SignIn() {
    const navigate = useNavigate(); // navigateオブジェクトの作成
    const [userId, setUserId] = useState(''); // ユーザーIDを保持するstate
    const [pass, setPass] = useState(''); // パスワードを保持するstate

    const onSignInClick = async() => {
        const ret = await sign_in(userId, pass);
        
        if (ret && ret.token) {
            navigate('main'); // メイン画面に遷移
        }
    }

    return (
        <div>
            <div>
                <label htmlFor="id">ID</label>
                <input id="id" value={userId} type="text" onChange={(evt) => setUserId(evt.target.value)} />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input id="password" value={pass} type="text" onChange={(evt) => setPass(evt.target.value)} />
            </div>
            <div>
                <button type="button" onClick={onSignInClick}>Login</button>
            </div>
        </div>
    )
}
