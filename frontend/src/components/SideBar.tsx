import { useContext, useState } from "react"
import { UserContext } from "../providers/UserProvider";

export default function SideBar() {
    const [msg, setMsg] = useState("");
    const { userInfo } = useContext(UserContext); // コンテキストからuserInfoを取り出す
    const onSendClick = () => {
        console.log("onSendClick");
        console.log(userInfo); // 値の確認
    }

    return (
        <div>
            <div>hoge</div>
            <div>hoge@example.com</div>
            <div>
                <textarea
                    rows={4}
                    value={msg}
                    onChange={(evt) => setMsg(evt.target.value)}
                ></textarea>
            </div>
            <div>
                <button onClick={onSendClick}>送信</button>
            </div>
        </div>
    )
}