import { Dispatch, SetStateAction, useState, createContext } from "react";
import { PostType } from "../types/Post";
import { ChildrenProps } from "../types/Props";

export const PostListContext = createContext(
    {} as {
        postList: PostType[]; // ポストの配列を保持
        setPostList: Dispatch<SetStateAction<PostType[]>>;
    },
);

export const PostListProvider = ({ children }: ChildrenProps) => {
    const [postList, setPostList] = useState<PostType[]>([]);
    return (
        <PostListContext.Provider value={{ postList, setPostList}}>
            {children}
        </PostListContext.Provider>
    )
}