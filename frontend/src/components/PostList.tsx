import { useContext, useEffect } from "react"
import { PostListContext, PostType } from "../providers/PostListContext"
import { UserContext } from "../providers/UserProvider";
import { getList } from "../api/Post";
import Post from "./Post";

export default function PostList() {
    // ポストリストコンテキスト、ユーザーコンテキストを使用する
    const { postList } = useContext(PostListContext);
    const { userInfo } = useContext(UserContext);
    const { setPostList } = useContext(PostListContext);

    // ポスト一覧を取得する関数
    const getPostList = async () => {
        console.log("MainLayout: getPostList");
        const posts = await getList(userInfo.token);
        console.log(posts)

        // getListで取得したポスト配列をコンテキストに保存する
        let postList: Array<PostType> = [];
        if (posts) {
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
    }

    // 描画時にポスト一覧を取得する
    useEffect(() => {
        getPostList();
    }, [])

    return (
        <div>
            <p>PostList</p>
            {postList.map((p) => (
                <Post key={p.id} post={p} />
            ))}
        </div>
    )
}