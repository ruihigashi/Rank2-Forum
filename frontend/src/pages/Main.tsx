import Layout from '../components/MainLayout'
import { PostListProvider } from '../providers/PostListContext'

export default function Main () {
    return (
        <PostListProvider>
            <Layout />
        </PostListProvider>
    )
}