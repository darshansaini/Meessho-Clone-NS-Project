import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Home from "./Pages/Home";
import Login from "./Login/Login";
import { ToastContainer } from "react-toastify";
// import Footer from "./component/Footer/Footer";
import Cart from "./component/Cart/Cart";
import Search from "./component/Search";
import SetItem from "./State/SetItem";
import Signup from "./Login/Signup";
import Productpage from "./Pages/Productpage";
import AllProduct from "./List/AllProduct";
import Checkout from "./component/Checkout";
import AuthProvider from "./State/AuthState.jsx";

function App() {
    return (
        <AuthProvider>
        <SetItem>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/productpage/:id" element={<Productpage />} />
                    <Route path="/allProduct" element={<AllProduct />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/search" element={<Search />} />
                </Routes>
                <ToastContainer
                    position="bottom-center"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />
            </BrowserRouter>
        </SetItem>
        </AuthProvider>
    );
}

export default App;
