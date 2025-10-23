import { useEffect, useState } from "react";
import closeModal from "../asset/img/closeModalButton.png"
import { updateUser } from "../api/User";
import { ModalProps } from "../types/Props";


export default function UserDetailModal({ show, onClose, userDetails, onUpdated, token }: ModalProps) {
    const [editing, setEditing] = useState(false);
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        createdAt: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (userDetails) {
            setUserData({
                name: userDetails.name || "",
                email: userDetails.umail || "",
                createdAt: userDetails.created_at ? new Date(userDetails.created_at).toISOString() : "",
            });
        }
    }, [userDetails]);

    if (!show) return null;

    const submit = async () => {
        setError(null);
        setLoading(true);
        try {
            const tokenToUse = (token ? token : "");
            if (!userDetails) { setError("User details not available."); setLoading(false); return; }
            const updated = await updateUser(userData.name, userData.email, userData.createdAt || new Date().toISOString(), tokenToUse, userDetails.id);
            if (onUpdated) onUpdated(updated);
            setEditing(false);
            onClose();
        } catch (err: any) {
            const respData = err?.response?.data;
            setError(typeof respData === 'string' ? respData : JSON.stringify(respData) || err.message || "更新に失敗しました");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black opacity-40" onClick={onClose}></div>

            <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-md z-10">
                <div className="mt-1 東right">
                    <button onClick={onClose} className="text-gray-900 rounded w-5 h-5">
                        <img src={closeModal} alt="閉じる" />
                    </button>
                </div>



                {error && <div className="text-red-600 mb-2">{error}</div>}

                {userDetails ? (
                    <div className="text-gray-800">
                        {!editing ? (
                            <>
                                <h3 className="text-xl font-semibold mb-4">ユーザー情報</h3>
                                <p className="mb-2">
                                    <strong className="text-gray-500">ユーザー名:</strong> {userDetails.name}
                                </p>
                                <p className="mb-2">
                                    <strong className="text-gray-500">メールアドレス:</strong> {userDetails.umail}
                                </p>
                                <div className="flex justify-center">
                                    <button onClick={() => setEditing(true)} className="text-white bg-blue-500 mt-4 px-6 py-2 rounded">
                                        編集
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <h3 className="text-xl font-semibold mb-4">ユーザー情報編集</h3>
                                <label className="block mb-2">
                                    <span className="text-sm text-gray-700">ユーザー名</span>
                                    <input value={userData.name} onChange={(e) => setUserData({ ...userData, name: e.target.value })} className="mt-1 block w-full border rounded px-2 py-1" />
                                </label>
                                <label className="block mb-2">
                                    <span className="text-sm text-gray-700">メールアドレス</span>
                                    <input value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} className="mt-1 block w-full border rounded px-2 py-1" />
                                </label>

                                <div className="flex justify-center gap-2 mt-4">
                                    <button onClick={() => setEditing(false)} className="px-4 py-2 border rounded">キャンセル</button>
                                    <button onClick={submit} disabled={loading} className="px-8 py-2 bg-green-600 text-white rounded">
                                        {loading ? '送信中...' : '保存'}
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                ) : (
                    <p>読み込み中...</p>
                )}

            </div>
        </div>
    );
}