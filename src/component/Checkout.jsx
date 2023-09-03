import { useContext } from "react";
import React from "react";
import { toast, ToastContainer } from "react-toastify";

import { useLocation, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { CartCoontext } from "../Context/Context";
import "./Checkout.css"
import Header from "./Header.jsx";
import Footer from "./Footer/Footer.js";

const Checkout = () => {
    const navigate = useNavigate();
    const Globalstate = useContext(CartCoontext);
    const state = Globalstate.state;
    const dispatch = Globalstate.dispatch;

    const handleComplete = async () => {
        toast.success("Order has been placed");
        localStorage.removeItem("usercart");
        state.map((item) => {
            dispatch({ type: "REMOVE", payload: item });
        });
        navigate("/");
    };
    const {
        state: { total },
    } = useLocation();
    return (
        <>
        <Header />
        <br></br><br></br><br></br><br></br>
        <div className="checkout-cover">
            <div className="checkout-page">
                <div className="address-form-wrapper">
                    <h2 className="title-head">Select delivery address</h2>
                    <div className="address-form">
                        <div className="form-header">
                        
                        </div>
                        <input type="text" name="name" placeholder=" Name" required/><br></br>
                        <input
                            type="number"
                            name="phoneNumber"
                            placeholder=" Phone No."
                            required
                        /><br></br>
                        <div className="form-header">
                            
                        </div>
                        <input
                            type="text"
                            name="houseno"
                            placeholder=" House No./Building Name"
                            required
                        /><br></br>
                        <input
                            type="text"
                            name="roadname"
                            placeholder=" Road Name/Area Name"
                            required
                        /><br></br>
                        <input
                            type="text"
                            name="pincode"
                            placeholder=" Pincode"
                            required
                        /><br></br>
                        <input
                            className="one-line"
                            type="text"
                            name="city"
                            placeholder=" City"
                            required
                        /><br></br>
                        <input
                            className="one-line"
                            type="text"
                            name="state"
                            placeholder=" State"
                            required
                        /><br></br>
                        <input
                            type="text"
                            name="nearby"
                            placeholder=" Nearby place"
                            required
                        /><br></br>
                    </div>
                </div>
                <div className="payment-form-wrapper">
                    <h3>Payment method</h3>
                    <div className="payment-form">
                        
                        <img src="/checkoutMode.png" alt="" />
                    </div>
                    
                    <div className="paymentDetails">
                        <p style={{fontWeight:"bolder"}}>Total :<span> </span>
                        <span>{total}</span></p>
                    </div>
                    <div className="OrderButton">
                    <center><button onClick={handleComplete} className="place-order" >
                        Place Order
                    </button></center>
                    </div>
                </div>
            </div>
            </div>
            <Footer />

        </>
    );
};

export default Checkout;
