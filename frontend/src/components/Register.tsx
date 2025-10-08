
export default function Register() {

    const onRegisterClick = async () => {

    }

    return (
        <div>
            <div className="flex items-center justify-center min-h-screen ">
                <div className="bg-gray-50 p-8 rounded-2xl shadow-xl w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-6 text-center">新規登録</h2>
                    <div className="mb-4">
                        <label htmlFor="id" className="block text-gray-700 mb-1">ユーザー名</label>
                        <input
                            id="id"
                            type="text"
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-300"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 mb-1">メールアドレス</label>
                        <input
                            id="password"
                            type="password"
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-300"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 mb-1">パスワード</label>
                        <input
                            id="password"
                            type="password"
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-300"
                        />
                    </div>
                    <button
                        type="button"
                        onClick={onRegisterClick}
                        className="w-full bg-gray-900 hover:bg-gray-700 text-white font-semibold py-2 px-4 mt-2 rounded transition"
                    >
                        登録
                    </button>
                </div>
            </div>
        </div>
    )
}