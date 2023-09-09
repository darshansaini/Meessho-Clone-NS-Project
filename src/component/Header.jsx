import React, { useContext, useState } from "react";
import meesho from "../img/meesho.png";
import search from "../img/search.png";
import mobile from "../img/mobile.png";
import user from "../img/user.png";
import { Badge } from "@mui/material";
import { GiShoppingCart } from "react-icons/gi";
import { useNavigate, Link } from "react-router-dom";
import { CartCoontext } from "../Context/Context";
import CreateItem from "../State/CreateItem";
import { AuthContext } from "../State/AuthState.jsx";
import { red } from "@mui/material/colors";
import { logoutUser } from "../auth.js";

const Header = () => {
    const [show, setShow] = useState("none");
    const [playstore, setPlaystore] = useState(false);
    // const [range, setRange] = useState(0);
    const [profile, setProfile] = useState(false);
    const [text, setText] = useState("");
    const ittem = useContext(CreateItem);
    const Globalstate = useContext(CartCoontext);
    const {currentUser, setCurrentUser} = useContext(AuthContext);
    const navigate = useNavigate();
    console.log("look here", currentUser, setCurrentUser)

    //Step-2
    const localData = JSON.parse(localStorage.getItem("user") || null);
    // console.log(localData)
    function valuee(e) {
        if (e.target.value) {
            setShow("block");
        } else {
            setShow("none");
        }
    }

    function store() {
        setPlaystore(!playstore);
    }

    function openLoginbtn() {
        setProfile(!profile);
    }

    function handleSubmit(e) {
        e.preventDefault();
        navigate(`/search?query=${text}`);
    }

    function changehandler(e) {
        setText(e.target.value);
        const filterProduct = ittem.data.filter(
            (ele) =>
                ele.title.toLowerCase().includes(text.toLowerCase()) ||
                ele.description.toLowerCase().includes(text.toLowerCase())
        );

        // console.log(filterProduct)
        ittem.updateapidata(filterProduct);
    }

    async function handleuser() {
        if(!currentUser){
            navigate("/Login")
        }else{
            const result = await logoutUser();
            if(result){
                setCurrentUser(null)
                navigate("/")
            }else{
                console.log("error while logging out")
            }
        }
    }

    return (
        <div name="home" className="pos" >
            <header className="headder" >
                <div className="headerLeft" >
                    <div className="logoContainer">
                        <img
                            src={meesho}
                            onClick={() => navigate("/")}
                            alt=""
                        />
                    </div>
                    <div className="searchInputContainer">
                        <div className="searchIcon">
                            <img src={search} />
                        </div>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="search"
                                value={text}
                                onChange={changehandler}
                                placeholder="Try Saree, Kurti or Search by Product Code"
                                className="inputSearch"
                            />
                        </form>
                        <div className="inputCloseSearch">
                            {/* <RxCross2 style={{ display: ` ${show}` }} /> */}
                        </div>
                    </div>
                </div>

                <div className="headerRight">
                    <div className="downloadContainer">
                        <div className="mobileIcon">
                            <img src={mobile} />
                        </div>
                        <p onClick={store}>Download App</p>

                        {playstore && (
                            <div style={{ display: "block" }}>
                                <div className="downloadHoverBtnContainer">
                                    <h3>Download From</h3>
                                    <a href="" className="downloadBtn">
                                        <img src="https://images.meesho.com/images/pow/playstore-icon-big.webp" />
                                    </a>
                                    <a href="" className="downloadBtn">
                                        <img src="https://images.meesho.com/images/pow/appstore-icon-big.webp" />
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="becomeSupplierContainer">
                        <p>Become a Supplier</p>
                    </div>

                    <div className="profileAndCart">
                        <div className="profileContainer">
                            <div className="profileIcon">
                                <img src={user} onClick={openLoginbtn} />
                            </div>
                            <p onClick={openLoginbtn}>{
                                                currentUser ? currentUser.displayName ? currentUser.displayName : currentUser.email : "Login"
                                            }</p>

                            {profile && (
                                <div style={{ display: "block" }}>
                                    <div className="profileHoverBtnContainer">
                                        <h3>
                                            Hello{" "}
                                            {
                                                currentUser ? currentUser.displayName ? currentUser.displayName : currentUser.email : "User"
                                            }
                                        </h3>
                                        <h5>
                                            {" "}
                                            {localData !== null
                                                ? "Welcome to Meesho"
                                                : "Access your account"}
                                        </h5>
                                        <button
                                            onClick={handleuser}
                                            className="login_btn"
                                        >
                                            {
                                                currentUser ? "Log out" : "Log in"
                                            }
                                            {/* Log{" "}
                                            {localData !== null ? "out" : "in"} */}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="CartContainer">
                            <div className="CartIcon">
                                <Badge
                                    color="secondary"
                                    badgeContent={Globalstate.state.length}
                                >
                                    <GiShoppingCart
                                        size={28}
                                        onClick={() => navigate("/cart")}
                                    />
                                </Badge>
                            </div>
                            <p>Cart</p>
                        </div>
                    </div>
                </div>
            </header>
            {/* <div>
                <nav className="hide-on-small">
                    <ul>
                        <Link to="/allProduct">Women Ethnics</Link>
                        <Link to="/allProduct">Women Western</Link>
                        <Link to="/allProduct">Men</Link>
                        <Link to="/allProduct">Kids</Link>
                        <Link to="/allProduct">Home & Kitchen</Link>
                        <Link to="/allProduct">Beauty & Health</Link>
                        <Link to="/allProduct">Jewellery & Accessories</Link>
                        <Link to="/allProduct">Bags & Footwear</Link>
                        <Link to="/allProduct">Electronics</Link>
                    </ul>
                </nav>
            </div> */}
        </div>
    );
};

export default Header;
