import { useState } from "react"

interface PostInputProps {
    onSend: (message: string) => Promise<void>;
}

export default function PostInput(props: PostInputProps) {
    const { onSend } = props;

    const [msg, setMsg] = useState("");

    const onSendClick = async () => {
        if (!msg.trim()) return;
        await onSend(msg);
        setMsg("");
    }

    return (
        <div>
            <textarea
                rows={4}
                value={msg}
                onChange={(evt) => setMsg(evt.target.value)}
                className="border-2 border-gray-400 w-full mt-6 rounded-md"
            ></textarea>
            <div className=" flex justify-end">
                <button onClick={onSendClick} className="bg-gray-900 hover:bg-gray-700 text-white px-4 py-1 rounded">
                    投稿
                </button>
            </div>
        </div>
    )
}