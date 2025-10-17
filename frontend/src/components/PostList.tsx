import { useContext, useEffect, useRef, useState } from "react"
import { PostListContext, PostType } from "../providers/PostListContext"
import { UserContext } from "../providers/UserProvider";
import { getList } from "../api/Post";
import reloadButton from "../asset/img/reloadButton.png"
import backButton from "../asset/img/backPageButton.png"
import nextButton from "../asset/img/nextPageButton.png"
import Search from "./Search";
import Post from "./Post";

export default function PostList() {
    // ポストリストコンテキスト、ユーザーコンテキストを使用する
    const { postList, setPostList } = useContext(PostListContext);
    const { userInfo } = useContext(UserContext);

    // 元の投稿一覧を保存しておく
    const originalPosts = useRef<PostType[]>([]);

    // 現在のページを保持しておく
    const [page, setPage] = useState(1);

    // 次ページがあるかどうかのState
    const [hasNextPage, setHasNextPage] = useState(false);


    // ポスト一覧を取得する関数(各ページごと)
    const getPostList = async (pageNum = 1) => {
        try {
            const posts = await getList(userInfo.token, pageNum);

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
        if (page > 1) {
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
                <Search />

                <div className="flex-col">
                    {postList.map((p: PostType) => (
                        <Post key={p.id} post={p} />
                    ))}
                </div>
            </div>
            <div className="flex justify-center mt-3 items-center">
                <img
                    src={backButton}
                    alt="前ページ"
                    className={`w-10 h-10 mr-5 cursor-pointer ${page === 1 ? "opacity-30 pointer-events-none" : ""
                        }`}
                    onClick={prevPage}
                />
                <p className=" text-lg font-medium">Page {page}</p>
                <img
                    src={nextButton}
                    alt="次ページ"
                    className={`w-11 h-10 ml-5 cursor-pointer ${!hasNextPage ? "opacity-30 pointer-events-none" : ""
                        }`}
                    onClick={nextPage}
                />
            </div>
        </div>
    )
}