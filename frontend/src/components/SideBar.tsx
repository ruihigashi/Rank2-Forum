import { useContext, useEffect, useState } from "react"
import { UserContext } from "../providers/UserProvider";
import { PostListContext, PostType } from "../providers/PostListContext";
import { post, getList } from "../api/Post";
import { getUser } from "../api/User";
import userDetail2 from "../asset/img/userDetaiButton2.png"

export default function SideBar() {
    const [msg, setMsg] = useState("");
    const { userInfo } = useContext(UserContext); // コンテキストからuserInfoを取り出す
    const { setPostList } = useContext(PostListContext);
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");

    const getPostList = async () => {
        const posts = await getList(userInfo.token);
        console.log(posts);
        let postList: Array<PostType> = [];
        if (posts) {
            console.log(posts);
            posts.posts.forEach((p: any) => {
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

    const onSendClick = async () => {
        await post(String(userInfo.id), userInfo.token, msg);
        await getPostList();
        setMsg("");
    }

    useEffect(() => {
        const myGetUser = async () => {
            const user = await getUser(userInfo.id, userInfo.token);
            setUserName(user.name);
            setEmail(user.umail);
        };
        myGetUser();
    }, []);

    return (
        <div className="h-full border-r-2 border-gray-400 px-4 py-4">
            <div className="flex items-center h-20">
                <img src={userDetail2} alt="ユーザーアイコン" className="w-16 h-16 mr-2"/>
                <div className="flex-col items-start space-y-1">
                    <div className="text-base sm:text-lg md:text-xl lg:text-2xl">{userName}</div>
                    <div className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600">{email}</div>
                </div>
            </div>
            <div>
                <textarea
                    rows={4}
                    value={msg}
                    onChange={(evt) => setMsg(evt.target.value)}
                    className="border-2 border-gray-400 w-full mt-6 rounded-md"
                ></textarea>
            </div>
            <div className=" flex justify-end">
                <button onClick={onSendClick} className="bg-gray-900 hover:bg-gray-700 text-white px-4 py-1 rounded">
                    送信
                </button>
            </div>
        </div>
    )
}