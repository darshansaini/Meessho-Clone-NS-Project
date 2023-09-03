import React from "react";
import Header from "./Header";
import List from "../List/List";
import { useSearchParams } from "react-router-dom";
const Search = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    console.log(searchParams.get("query"));
    let query = searchParams.get("query");
    // let { query } = searchParams;
    return (
        <>
            <Header />
            <div
                style={{ margin: "100px", height: "1px", width: "100%" }}
            ></div>
            <List searchQuery={query} />
        </>
    );
};

export default Search;
