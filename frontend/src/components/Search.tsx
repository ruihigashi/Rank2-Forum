import { useState } from "react"

type SearchProps = {
    onSearch: (keyword: string) => void;
};

export default function Search(props: SearchProps) {
    const { onSearch } = props;

    const [searchWord, setSearchWord] = useState("");

    // 検索ボタンを押したときの処理
    const handleSearch = () => {
        onSearch(searchWord)
    };

    return (
        <div className="flex gap-2 mb-4">
            <input
                type="text"
                placeholder="検索ワードを入力"
                value={searchWord}
                onChange={(e) => setSearchWord(e.target.value)}
                className="flex-1 px-3 py-2 border rounded"
            />
            <button
                className="px-4 py-2 bg-gray-800 text-white rounded"
                onClick={handleSearch}
            >
                検索
            </button>
        </div>
    )
}