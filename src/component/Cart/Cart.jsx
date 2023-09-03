// import { CartCoontext } from "../../../Context/Context";
import { Navigate } from "react-router-dom";
import "./Cart.css";
// import Navbar from "../../Navv/Nav";
import { RiDeleteBin4Fill } from "react-icons/ri";
import { IoAddCircle } from "react-icons/io5";
import { AiFillMinusCircle } from "react-icons/ai";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { CartCoontext } from "../../Context/Context";
import { AuthContext } from "../../State/AuthState.jsx";
import {useContext} from "react";
import Header from "../Header";

const Cart = () => {
  const {currentUser, setCurrentUser} = useContext(AuthContext);
    const navigate = useNavigate();
    const Globalstate = useContext(CartCoontext);
    const state = Globalstate.state;
    const dispatch = Globalstate.dispatch;
    localStorage.setItem("usercart", JSON.stringify(state));
    const total = state.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);

    const isAuthenticated = !!currentUser;

    const handleCheckout = () => {
        if (isAuthenticated) {
            navigate("/checkout", { state: { total: total } });
        } else {
            navigate("/signup");
        }
    };
    return (
        <>
            <Header />
            <div className="cart">
                {state.length > 0 && (
                    <>
                        {state.map((item, index) => {
                            // item.quantity = 1;

                            return (
                                <div className="card" key={index}>
                                    <img src={item.image} alt="" />
                                    <p>{item.title}</p>
                                    <p>{item.quantity * item.price}</p>
                                    <div className="quantity">
                                        <button
                                            onClick={() =>
                                                dispatch({
                                                    type: "INCREASE",
                                                    payload: item,
                                                })
                                            }
                                        >
                                            <IoAddCircle size={20} />
                                        </button>

                                        <p>{item.quantity}</p>

                                        <button
                                            onClick={() => {
                                                if (item.quantity > 1) {
                                                    dispatch({
                                                        type: "DECREASE",
                                                        payload: item,
                                                    });
                                                } else {
                                                    dispatch({
                                                        type: "REMOVE",
                                                        payload: item,
                                                    });
                                                }
                                            }}
                                        >
                                            <AiFillMinusCircle size={20} />
                                        </button>
                                    </div>
                                    <h2
                                        onClick={() =>
                                            dispatch({
                                                type: "REMOVE",
                                                payload: item,
                                            })
                                        }
                                    >
                                        <RiDeleteBin4Fill className="pointer" />
                                    </h2>
                                </div>
                            );
                        })}
                        <div className="total">
                            <h2>₹{total.toFixed(2)}</h2>
                        </div>
                        <button
                            onClick={handleCheckout}
                            className="btn pointer"
                        >
                            {isAuthenticated
                                ? "Check Out"
                                : "Login to checkout"}
                        </button>

                        <ToastContainer
                            position="top-center"
                            autoClose={3000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="dark"
                        />
                    </>
                )}

                {!(state.length > 0) && (
                    <img
                        className="empty-cart"
                        src="/empty-cart.svg"
                        alt="empty cart"
                    />
                )}
            </div>
        </>
    );
};

export default Cart;
