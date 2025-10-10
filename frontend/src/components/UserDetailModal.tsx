import closeModal from "../asset/img/closeModalButton.png"

type Props = {
    show: boolean;
    onClose: () => void;
    userDetails: any | null;
};

export default function UserDetailModal({ show, onClose, userDetails }: Props) {
    if (!show) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* propsで受け取ったonClose関数をもとにモーダルの外を押したときに閉じれるようにする */}
            <div className="absolute inset-0 bg-black opacity-40" onClick={onClose}></div>

            <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-md z-10">

                <div className="mt-1 text-right">
                    <button onClick={onClose} className="text-gray-900 rounded w-5 h-5">
                        <img src={closeModal} alt="閉じる" />
                    </button>
                </div>
                <h3 className="text-xl font-semibold mb-4">ユーザー情報</h3>
                {userDetails ? (
                    <div className="text-gray-800">
                        <p className="mb-2">
                            <strong>ユーザー名:</strong> {userDetails.name}
                        </p>
                        <p className="mb-2">
                            <strong>メールアドレス:</strong> {userDetails.umail || userDetails.email}
                        </p>
                        <p className="mb-2">
                            <strong>作成日:</strong> {new Date(userDetails.created_at).toLocaleString()}
                        </p>
                    </div>
                ) : (
                    <p>読み込み中...</p>
                )}
                <div className="flex justify-center">
                    <button className="text-white bg-blue-500 mt-4 px-10 py-2 rounded">
                        編集
                    </button>
                </div>

            </div>
        </div>
    );
}