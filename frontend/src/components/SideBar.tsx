import { useContext, useEffect, useState } from "react";
import { getList, post } from "../api/Post";
import { getUser } from "../api/User";
import userDetail2 from "../asset/img/userDetaiButton2.png";
import { PostListContext } from "../providers/PostListContext";
import { UserContext } from "../providers/UserProvider";
import PostInput from "./PostInput";
import { PostType } from "../types/Post";

export default function SideBar() {
    const { userInfo } = useContext(UserContext); // コンテキストからuserInfoを取り出す
    const { setPostList } = useContext(PostListContext);

    const [userData, setUserData] = useState({
        userName: '',
        email: ''
    })  

    const getPostList = async () => {
        const posts = await getList(userInfo.token);
        let postList: Array<PostType> = [];
        if (posts) {
            posts.posts.forEach((p: PostType) => {
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

    const handleSend = async (msg: string) => {
        // 送信ボタンをクリックした際に投稿内容をデータベースに保存
        await post(String(userInfo.id), userInfo.token, msg);
        await getPostList();
    }

    useEffect(() => {
        const myGetUser = async () => {
            const user = await getUser(userInfo.id, userInfo.token);
            setUserData({
                userName: user.name,
                email: user.umail
            });
        };
        myGetUser();
    }, []);

    return (
        <div className="h-full border-r-2 border-gray-400 px-4 py-4">
            <div className="flex items-center h-20">
                <img src={userDetail2} alt="ユーザーアイコン" className="w-16 h-16 mr-2" />
                <div className="flex-col items-start space-y-1">
                    <div className="text-base sm:text-lg md:text-xl lg:text-2xl">{userData.userName}</div>
                    <div className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600">{userData.email}</div>
                </div>
            </div>

            <PostInput onSend={handleSend}/>
        </div>
    )
}