import React, { useContext, useEffect, useState } from "react";
// import { FaRegStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Header from "../component/Header";
import { CartCoontext } from "../Context/Context";
import "./productDetails.css";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { AiOutlineMinusCircle } from "react-icons/ai";
import Footer from "../component/Footer/Footer.js";

import PacmanLoader from "react-spinners/PacmanLoader";

const Productpage = () => {
    const Globalstate = useContext(CartCoontext);

    const dispatch = Globalstate.dispatch;
    const params = useParams();
    const [details, setDetails] = useState({});
    const [loader, setLoader] = useState(false);
    const [counter, setCounter] = useState(0);

    var qty = "quantity";
    var val = 1;
    details[qty] = val;

    const state = Globalstate.state;
    // const [productState] = state.filter((item) => item.id == params.id);
    // console.log("look here", productState);
    // console.log(state);
    // console.log(params.id);
    // const [clicked, setClicked] = useState(false);
    // function clickHandle() {
    //   setClicked(true);
    // }

    function addtoCart() {
        let newDetails = { ...details };
        newDetails.quantity = counter;
        dispatch({ type: "ADD", payload: newDetails });
    }
    useEffect(() => {
        (async function () {
            try {
                const response = await fetch(
                    `https://content.newtonschool.co/v1/pr/63b6c911af4f30335b4b3b89/products/${params.id}`
                );
                const data = await response.json();

                setTimeout(() => {
                    setDetails(data);
                    setLoader(true);
                    // console.log(details);
                }, 2000);
            } catch (err) {
                console.log(err);
            }
        })();
    }, []);
    if (!loader) {
        return (
            <img
                style={{
                    position: "fixed",
                    inset: 0,
                    margin: "auto",
                    width: "110px",
                    height: "auto",
                }}
                src="/loading.svg"
                alt=""
            />
        );
    }

    return (
        <>
            <Header />

            <main id="single-product">
                <div class="pro-details-container margin-top">
                    <div class="left-column">
                        <img src={details.image} alt="${title}" />
                    </div>
                    <div class="right-column">
                        <div class="product-description">
                            <span
                                style={{ fontSize: "26px", fontWeight: "bold" }}
                            >
                                {details.category}
                            </span>
                            <h1>{details.title}</h1>
                            <h3></h3>
                        </div>
                        <div class="product-configuration">
                            {details.description}
                        </div>
                        <div id="single-product-price">
                            <h2>
                                {" "}
                                <span class="price">₹ {details.price}</span>
                            </h2>
                            <h2>
                                <span class="disscount-single"></span>
                            </h2>
                        </div>

                        <div class="pro-rating">
                            <span>{details.rating.rate}</span>
                        </div>
                        <div className="product-quantity-setter">
                            <AiOutlineMinusCircle
                                onClick={() =>
                                    setCounter((prev) => {
                                        if (prev - 1 >= 0) {
                                            return prev - 1;
                                        }
                                        return 0;
                                    })
                                }
                            />
                            <p>{counter}</p>
                            <AiOutlinePlusCircle
                                onClick={() => setCounter((prev) => prev + 1)}
                            />
                        </div>
                        <div class="product-price">
                            <div>
                                {/* <button class="cart-btn" onClick={addtoCart} id="cart-btn">Add to cart</button> */}
                                <button className="btn" onClick={addtoCart}>
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default Productpage;
