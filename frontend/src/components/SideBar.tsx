import { useState } from "react"

export default function SideBar() {
    const [msg, setMsg] = useState("");

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
                <button>送信</button>
            </div>
        </div>
    )
}