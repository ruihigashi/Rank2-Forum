import { useContext, useEffect } from "react"
import { PostListContext, PostType } from "../providers/PostListContext"
import { UserContext } from "../providers/UserProvider";
import { getList } from "../api/Post";
import Post from "./Post";

export default function PostList() {
    // ポストリストコンテキスト、ユーザーコンテキストを使用する
    const { postList, setPostList } = useContext(PostListContext);
    const { userInfo } = useContext(UserContext);

    // ポスト一覧を取得する関数
    const getPostList = async () => {
        console.log("MainLayout: getPostList");
        const posts = await getList(userInfo.token);
        console.log(posts)

        // getListで取得したポスト配列をコンテキストに保存する
        let fetchedPosts: Array<PostType> = [];
        if (posts) {
            posts.forEach((p: PostType) => {
                postList.push({
                    id: p.id,
                    user_name: p.user_name,
                    content: p.content,
                    created_at: new Date(p.created_at),
                });
            });
        }
        setPostList(fetchedPosts);
    }

    // 描画時にポスト一覧を取得する
    useEffect(() => {
        getPostList();
    }, [])

    return (
        <div className="px-4 py-4 display justify-center">
            <div className="flex justify-center">
                <p className="text-4xl mb-4 font-medium">PostList</p>
            </div>
            <div>
                {postList.map((p: PostType) => (
                    <Post key={p.id} post={p} />
                ))}
            </div>
        </div>
    )
}