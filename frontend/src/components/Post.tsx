import React, { ReactNode } from "react";

export default function Post(props: any) {
    const { children, post } = props;
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

    return (
        <div className="mb-4">
            <div className="text-xl font-semibold">{post.user_name}</div>
            <div className="border border-gray-900 rounded px-4 py-3 relative bg-white">
                <div className="text-base text-gray-800 whitespace-pre-wrap">
                    {getLines(post.content)}
                </div>
                <div className="absolute right-2 bottom-1 text-xs text-gray-500">
                    {getDateStr(post.created_at)}
                </div>
            </div>
        </div>
    )
}