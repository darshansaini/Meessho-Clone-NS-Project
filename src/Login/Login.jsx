import { nanoid } from "nanoid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import { mobile, tab } from "../responsive";
import {AuthContext} from "../State/AuthState.jsx";
import { useContext } from "react";
import {loginWithGoogle, loginUser} from "../auth.js";
// import { AuthContext } from "../State/AuthState.jsx";
// import Button from '@mui/material/Button';

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(
            rgba(255, 255, 255, 0.5),
            rgba(255, 255, 255, 0.5)
        ),
        url("https://media.fashionnetwork.com/cdn-cgi/image/fit=contain,width=1000,height=1000/m/0b8e/6422/560a/0f5c/680f/917b/371c/9c0e/907a/803e/803e.jpeg")
            center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
`;


const Wrapper = styled.div`
    width: 25%;
    padding: 20px;
    background-color: pink;
    ${mobile({ width: "55%" })}
    ${tab({ width: "55%" })}
`;

const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 10px 0;
    padding: 10px;
`;

const Button = styled.button`
    width: 100%;
    border: none;
    padding: 15px 20px;
    background-color: rgb(239, 96, 120);
    &:hover {
        background-color: rgb(240, 26, 62);
        font-weight: 500;
    }
    color: white;
    cursor: pointer;
    margin-bottom: 10px;
`;

const Link = styled.a`
    margin: 5px 0px;
    font-size: 12px;
    text-decoration: underline;
    cursor: pointer;
`;

const Login = () => {
    let [value, setValue] = useState({
        email: "",
        pass: "",
        logInn: true,
        id: nanoid(),
    });

    // let [err, seterr] = useState(false);
    // let [errtxt, seterrtxt] = useState("");
    const navigate = useNavigate();
    const {currentUser, setCurrentUser} = useContext(AuthContext);
    let handleInputChange = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value,
        });
    };

    let handleSubmit = async (e) => {
        e.preventDefault();
        if (!value.email || !value.pass) {
            toast.error("Some fields are missing");
        }else {
            // setValue((prev)=> ({
            //   ...prev,
            //   logInn: true }));
            // localStorage.setItem("user", JSON.stringify(value));
            let user = await loginUser(value.email, value.pass);
            if(user){
                setCurrentUser(user);
                navigate("/");
                toast.success("Login Sucessful", {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }else{
                toast.error("Login Failed", {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }
        }
    };

    const handleLoginWithGoogle = async () => {
        const user = await loginWithGoogle();
        if(user){
            setCurrentUser(user);
            navigate("/");
            console.log(user);
        }
    }

    return (
        <Container>
            <Wrapper>
                <center><Title>LOG IN</Title></center>
                <Form>
                    <Input
                        className="input"
                        name="email"
                        required
                        type="email"
                        placeholder="Enter your mailID"
                        value={value.email}
                        onChange={handleInputChange}
                    />
                    <Input
                        className="input"
                        name="pass"
                        type="password"
                        required
                        placeholder="*******"
                        value={value.pass}
                        onChange={handleInputChange}
                    /> 
                    
                    <Button onClick={handleSubmit}>LOGIN</Button>

                    <Button id="google" onClick={handleLoginWithGoogle}>LOGIN WITH GOOGLE</Button>
                    
                    <h5 style={{
                        color:"gray",
                        display:"inline",
                    }}>If you havn't sign up yet click on <a href="/Signup">Register</a></h5>
                </Form>
            </Wrapper>
        </Container>
    );
};

export default Login;
