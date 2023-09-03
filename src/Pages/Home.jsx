import Categories from "../component/Categories";
import Header from "../component/Header";
import List from "../List/List";
import SetItem from "../State/SetItem";
import Slidder from "../component/Slidder/Slidder";
import Footer from "../component/Footer/Footer";
import {getAuthStatus} from "../auth.js";
import {useEffect} from "react";
import {AuthContext} from "../State/AuthState.jsx";
import {useContext} from "react";
const Home = () => {
    const {currentUser, setCurrentUser} = useContext(AuthContext);
    useEffect(() => {
        const unsubscribe = getAuthStatus(setCurrentUser)
        if(typeof unsubscribe === "function") {
            return unsubscribe;
        }
    },[])
    return (
        <>
            <SetItem>
                <Header />
                <Slidder />
                <Categories />
                <List />
                <Footer />
            </SetItem>
        </>
    );
};

export default Home;
