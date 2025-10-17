import { useContext, useRef, useState } from "react"
import { PostListContext, PostType } from "../providers/PostListContext";

export default function Search() {
    // ポストリストコンテキスト、ユーザーコンテキストを使用する
    const { postList, setPostList } = useContext(PostListContext);

    // 元の投稿一覧を保存しておく
    const originalPosts = useRef<PostType[]>([]);
    const [searchWord, setSearchWord] = useState("");

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
    )
}