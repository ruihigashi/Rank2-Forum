import { useContext, useState } from "react"
import { UserContext } from "../providers/UserProvider";
import { PostListContext, PostType } from "../providers/PostListContext";
import { getList } from "../api/Post";

export default function SideBar() {
    const [msg, setMsg] = useState("");
    const { userInfo } = useContext(UserContext); // コンテキストからuserInfoを取り出す
    const { setPostList } = useContext(PostListContext);

    const getPostList = async () => {
        const posts = await getList(userInfo.token);
        console.log(posts);
        let postList: Array<PostType> = [];
        if (posts) {
            console.log(posts);
            posts.forEach((p: any) => {
                postList.push({
                    id: p.id,
                    user_name: p.user_name,
                    content: p.content,
                    created_at: new Date(p.created_at),
                });
            });
        }

        setPostList(postList);

    };
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