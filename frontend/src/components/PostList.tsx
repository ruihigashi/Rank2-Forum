import { useContext, useEffect, useRef, useState } from "react"
import { PostListContext, PostType } from "../providers/PostListContext"
import { UserContext } from "../providers/UserProvider";
import { getList } from "../api/Post";
import Post from "./Post";

export default function PostList() {
    // ポストリストコンテキスト、ユーザーコンテキストを使用する
    const { postList, setPostList } = useContext(PostListContext);
    const { userInfo } = useContext(UserContext);

    // 元の投稿一覧を保存しておく
    const originalPosts = useRef<PostType[]>([]);
    const [searchWord, setSearchWord] = useState("");

    // ポスト一覧を取得する関数
    const getPostList = async () => {
        console.log("MainLayout: getPostList");
        const posts = await getList(userInfo.token);
        console.log(posts)

        // getListで取得したポスト配列をコンテキストに保存する
        let fetchedPosts: Array<PostType> = [];
        if (posts) {
            posts.forEach((p: PostType) => {
                fetchedPosts.push({
                    id: p.id,
                    user_name: p.user_name,
                    content: p.content,
                    created_at: new Date(p.created_at),
                });
            });
        }
        originalPosts.current = fetchedPosts;
        setPostList(fetchedPosts);
    }

    // 描画時にポスト一覧を取得する
    useEffect(() => {
        getPostList();
    }, [])

    // 検索ボタンを押したときの処理
    const handleSearch = () => {
        const word = searchWord.trim().toLowerCase();

        // 空欄なら全件表示に戻す
        if (!word) {
            setPostList(originalPosts.current);
            return;
        }

        // 投稿内容またはユーザー名に含まれるものを抽出
        const result = originalPosts.current.filter(
            (post) =>
                post.content.toLowerCase().includes(word) ||
                post.user_name.toLowerCase().includes(word)
        );

        setPostList(result);
    };

    return (
        <div className="px-4 py-4 display justify-center">
            <div className="flex justify-center">
                <p className="text-4xl mb-4 font-medium">PostList</p>
            </div>
            <div className="border p-4">
                <div className="flex gap-2 mb-4">
                    <input
                        type="text"
                        placeholder="検索ワードを入力"
                        value={searchWord}
                        onChange={(e) => setSearchWord(e.target.value)}
                        className="flex-1 px-3 py-2 border rounded"
                    />
                    <button
                        className="px-4 py-2 bg-gray-800 text-white rounded"
                        onClick={handleSearch}
                    >
                        検索
                    </button>
                </div>

                <div>
                    {postList.map((p: PostType) => (
                        <Post key={p.id} post={p} />
                    ))}
                </div>
            </div>
        </div>
    )
}