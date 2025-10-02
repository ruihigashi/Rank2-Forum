import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { UserContext } from "../providers/UserProvider";
import { getUser } from "../api/User";

export default function Header() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [userInfo, setUserInfo] = useContext(UserContext);
    
    const logout = () => {
        setUserInfo({ id: 0, token: "" });
        const logout = () => {
            setUserInfo({ id: 0, token: "" });
            navigate("/");
        }
    }

    useEffect(() => {
        const myGetUser = async () =>  {
            const user = await getUser(userInfo.id,userInfo.token);
            setUserName(user.name);
        };
        myGetUser();
    }, []);

    return (
        <div>
            <span>MicroPost</span>
            <span>{userName}</span>
            <span onClick={logout}>ログアウト</span>
        </div>
    )
}