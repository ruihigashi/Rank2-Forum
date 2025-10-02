import { useContext } from 'react'
import Layout from '../components/MainLayout'
import { PostListProvider } from '../providers/PostListContext'
import { UserContext } from '../providers/UserProvider'
import { Navigate } from 'react-router-dom';
import MainLayout from '../components/MainLayout';

export default function Main () {
    const { userInfo } = useContext(UserContext);
    const loggedIn = (userInfo.token !== '');

    console.log(loggedIn)
    return (
        <PostListProvider>
            {
                loggedIn ? <MainLayout />:<Navigate replace to="/" />
            }
        </PostListProvider>
    )
}