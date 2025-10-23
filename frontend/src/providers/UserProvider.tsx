import React, { Dispatch, SetStateAction, useState, createContext } from "react";

// 保持する情報の型
type UserInfo = {
    id: number;
    token: string;
}

// UserContextの作成
// UserContextにはProviderとConsumerの二つのフィールドが含まれる
export const UserContext = createContext (
    {} as {
        userInfo: UserInfo;
        setUserInfo: Dispatch<SetStateAction<UserInfo>>;
    },
);

// UserProviderの定義
export const UserProvider = ({ children }: React.PropsWithChildren) => {
    // UserInfoを保持する変数と更新関数の作成
    const [userInfo, setUserInfo] = useState<UserInfo>({ id: 0, token: ""});
    return (
        // UserContext.Providerはvalueに設定された値: ここではuserInfoとsetUserInfoを提供する
        <UserContext.Provider value={{ userInfo, setUserInfo }}>
            {children}
        </UserContext.Provider>
    );
}