import React, { ReactNode, useContext } from "react";
import deleteButton from "../asset/img/deleteButton.png"
import { PostListContext } from "../providers/PostListContext";
import { UserContext } from "../providers/UserProvider";
import { deletePost } from "../api/Post";

export default function Post(props: any) {
    const { post } = props;
    // ユーザー情報と投稿一覧のコンテキストをトップレベルで取得
    const { userInfo } = useContext(UserContext);
    const { postList, setPostList } = useContext(PostListContext);
    const getDateStr = (dateObj: Date) => {
        const year = post.created_at.getFullYear();
        const month = post.created_at.getMonth() + 1;
        const date = post.created_at.getDate();
        const hour = post.created_at.getHours();
        const min = post.created_at.getMinutes();
        const sec = post.created_at.getSeconds();
        return `${year}年${month}月${date}日 ${hour}時${min}分${sec}秒`;
    };

    const getLines = (src: string): ReactNode => {
        return src.split('\n').map((line, index) => {
            return (
                <React.Fragment key={index}>
                    {line}
                    <br />
                </React.Fragment>
            )
        });
    }

    // 削除ボタンを押したときの処理
    const onClickDelete = async () => {
        // 確認ダイアログ
        const ok = window.confirm('本当にこの投稿を削除しますか？');
        if (!ok) return; // ユーザーがキャンセルしたら何もしない

        try {
            // APIに削除リクエストを送る
            await deletePost(post.id, userInfo.token);

            // ローカルの投稿一覧から該当投稿を取り除いてUIを更新
            const filtered = postList.filter((p: any) => p.id !== post.id);
            setPostList(filtered);
        } catch (err) {
            console.error('削除エラー', err);
            alert('削除に失敗しました');
        }
    }

    return (
        <div className="mb-4">
            <div className="text-xl font-semibold mb-1">{post.user_name}</div>
            <div className="relative flex w-full items-start">
                <div className="border border-gray-900 rounded px-4 py-3 bg-white w-full">
                    <div className="text-base text-gray-800 whitespace-pre-wrap">
                        {getLines(post.content)}
                    </div>
                    <div className="text-right text-xs text-gray-500">
                        {getDateStr(post.created_at)}
                    </div>
                </div>
                <button
                    className="flex items-center justify-center w-10 h-10 hover:opacity-80 transition"
                    onClick={onClickDelete}
                >
                    <img src={deleteButton} alt="削除ボタン" className="w-5 h-5" />
                </button>
            </div>
        </div>
    )
}