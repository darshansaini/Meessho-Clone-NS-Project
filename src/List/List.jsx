import React, { useContext, useEffect, useState } from "react";
import Product from "../Product/Product";
import "../List/List.css";
import axios from "axios";
import CreateItem from "../State/CreateItem";

const List = ({ searchQuery }) => {
    const api = useContext(CreateItem);
    const [page, setPage] = useState(1);
    const limit = 10;
    const url = `https://content.newtonschool.co/v1/pr/63b6c911af4f30335b4b3b89/products?limit=${limit}&page=${page}`;
    const producturl = () => {
        axios.get(url).then((response) => {
            let products = response.data;
            console.log("search query", searchQuery);
            if (searchQuery) {
                console.log("look here", response);
                const filterProduct = response.data.filter(
                    (ele) =>
                        ele.title
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase()) ||
                        ele.description
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase())
                );
                products = filterProduct;
            }
            api.updatedata(products);
        });
    };

    useEffect(() => {
        producturl();
    }, [page]);

    const nextPage = () => {
        setPage(page + 1);
    };
    const prevPage = () => {
        setPage(page - 1);
    };

    return (
        <>
            <div className="each-item-wrapper">
                {api.newdata.length !== 0
                    ? api.newdata.map((item, id) => {
                          return (
                              <Product item={item} key={`${item.id}-${page}`} />
                          );
                      })
                    : api.data.map((item, id) => {
                          return (
                              <Product item={item} key={`${item.id}-${page}`} />
                          );
                      })}
            </div>
            <div className="button-container">
                <button
                    className={`btn-prev ${page === 1 ? "disabled" : ""}`}
                    id="pagination-button-prev"
                    onClick={prevPage}
                    disabled={page === 1}
                >
                    Prev
                </button>
                <button
                    className={`btn-next ${page === 2 ? "disabled" : ""}`}
                    id="pagination-button-next"
                    onClick={nextPage}
                    disabled={page === 2}
                >
                    Next
                </button>
            </div>
        </>
    );
};

export default List;
