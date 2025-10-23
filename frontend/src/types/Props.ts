import { ReactNode } from "react";
import { UserType } from "./User";

export type ModalProps = {
    show: boolean;
    onClose: () => void;
    userDetails: UserType | null;
    onUpdated?: (updated: UserType) => void;
    token?: string;
};

export type SearchProps = {
    onSearch: (keyword: string) => void;
};


export interface PostInputProps {
    onSend: (message: string) => Promise<void>;
}

export type ChildrenProps = {
    children: ReactNode;
}