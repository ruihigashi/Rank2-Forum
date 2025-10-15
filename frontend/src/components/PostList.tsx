import { useContext, useEffect, useRef, useState } from "react"
import { PostListContext, PostType } from "../providers/PostListContext"
import { UserContext } from "../providers/UserProvider";
import { getList } from "../api/Post";
import Post from "./Post";
import reloadButton from "../asset/img/reloadButton.png"
import backButton from "../asset/img/backPageButton.png"
import nextButton from "../asset/img/nextPageButton.png"

export default function PostList() {
    // ポストリストコンテキスト、ユーザーコンテキストを使用する
    const { postList, setPostList } = useContext(PostListContext);
    const { userInfo } = useContext(UserContext);

    // 元の投稿一覧を保存しておく
    const originalPosts = useRef<PostType[]>([]);
    const [searchWord, setSearchWord] = useState("");

    // 現在のページを保持しておく
    const [page, setPage] = useState(1);

    // 次ページがあるかどうかのState
    const [hasNextPage, setHasNextPage] = useState(false);


    // ポスト一覧を取得する関数(各ページごと)
    const getPostList = async (pageNum = 1) => {
        try {
            const posts = await getList(userInfo.token, pageNum);
            console.log("📡 取得ページ:", pageNum, posts);

            let fetchedPosts: Array<PostType> = [];

            if (posts && Array.isArray(posts)) {
                fetchedPosts = posts.map((p: PostType) => ({
                    id: p.id,
                    user_name: p.user_name,
                    content: p.content,
                    created_at: new Date(p.created_at),
                }));
            } else if (posts.posts) {
                fetchedPosts = posts.posts.map((p: PostType) => ({
                    id: p.id,
                    user_name: p.user_name,
                    content: p.content,
                    created_at: new Date(p.created_at),
                }));
            }

            originalPosts.current = fetchedPosts;
            setPostList(fetchedPosts);

            setHasNextPage(fetchedPosts.length === 10);
        } catch (error) {
            console.error("投稿一覧取得中にエラー:", error);
        }
    };

    // 描画時にポスト一覧を取得する（初回レンダー時）
    useEffect(() => {
        getPostList(1);
    }, [])

    // ページ変更時に再取得
    useEffect(() => {
        getPostList(page);
    }, [page]);

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

    const onReloadClick = () => {
        // getPostList を呼んで最新データを取得する
        getPostList();

        alert("更新が完了しました")
    }

    const nextPage = () => {
        if (hasNextPage) {
            setPage((prev) => prev + 1);
        } else {
            alert("次ページはありません")
        }
    }

    const prevPage = () => {
        if (hasNextPage) {
            setPage((prev) => prev - 1);
        } else {
            alert("前のページはありません");
        }
    }

    return (
        <div className="px-4 py-4 display justify-center">
            <div className="flex items-center justify-between px-8">
                <p className="text-4xl mb-4 font-medium text-center flex-1">PostList</p>
                <button
                    className="flex items-center justify-end"
                    onClick={onReloadClick}
                >
                    <img src={reloadButton} alt="リロードボタン" className="w-6 h-5" />
                </button>
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
            <div className="flex justify-center mt-3">
                <img src={backButton} alt="前ページ" className="w-10 h-10 mr-5" onClick={prevPage} />
                <img src={nextButton} alt="次ページ" className="w-11 h-10" onClick={nextPage} />
            </div>
        </div>
    )
}