
"use client";

import { searchAction } from "@/action/searchAction";
import { useRouter } from "next/navigation";
import { useState } from "react";


export const SearchComponent = () => {
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSearch = async () => {
        setLoading(true);
        setError("")
        try {
            console.log("search")
            const response: any = await searchAction(search)
            console.log("response", response)
            setSearch("")
            if (response.length === 0) {
                setError("Nothing found")
                return
            }
            sessionStorage.setItem("searchResults", JSON.stringify(response));
            router.push(`/results?query=${encodeURIComponent(search)}`);


        } catch (e) {
            setError("An error occured while searching")
            console.error(e)
        } finally {
            setLoading(false)
        }

    }
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    }
    return (
       
        <div className="w-full max-w-2xl">
            <div className="relative">
                <input
                    type="text"
                    className="w-full rounded-full border border-gray-300 py-3 px-5 pr-14 shadow-md focus:outline-none"
                    placeholder="Search location"
                    value={search}
                    onKeyDown={handleKeyPress}
                    disabled={loading}
                    name="search"
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white rounded-full p-2 cursor-pointer"
                    onClick={handleSearch}
                    disabled={search.trim() === "" || loading}
                >
                    🔍
                </button>
            </div>
            {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
        </div>


    )
}