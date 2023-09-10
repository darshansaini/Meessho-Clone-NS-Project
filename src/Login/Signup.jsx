
import { nanoid } from "nanoid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import { mobile, tab } from "../responsive";
// import Button from '@mui/material/Button';
import { registerUser } from "../auth.js";
import {AuthContext} from "../State/AuthState.jsx";
import { useContext } from "react";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://static.startuptalky.com/2022/04/How-to-Market-Your-Product-on-Meesho-StartupTalky.jpg")
      center ;
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
  width: 40%;
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

const Signup = () => {
  let [value, setValue] = useState({
    email: "",
    pass: "",
    password_verify: "",
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
    if (!value.email || !value.pass || !value.password_verify) {
      toast.error("Some fields are missing");
   
    }else if(value.pass !== value.password_verify) {
      toast.error("passwords do not match");
    } else {
  

      // setValue((prev)=> ({
      //   ...prev,
      //   logInn: true }));
      // Step-1
      // localStorage.setItem("user", JSON.stringify(value));
      const user = await registerUser(value.email,value.pass)
      if(user){
        setCurrentUser(user);
        toast.success("Account created successfully and logged in");
        navigate("/");
        console.log(user);
        
      }else{
        console.log("error while registering")
        toast.error("error while registering");
      }

      
    }
  };


  return (

    <Container>
      
      <Wrapper>

        <Title>SIGN UP</Title>
        <Form onSubmit={handleSubmit}>
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
          <Input
              className="input"
              type="password"
              name="password_verify"
              placeholder="please enter your password again"
              value={value.name}
              onChange={handleInputChange}
          />

          {/* {err ? <div style={{color: 'red' , font_size: '15px'}}>{errtxt}</div> : null} */}
          <Button>Signup</Button>

          
        </Form>
        <h5 style={{
                        color:"gray",
                        display:"inline",
                    }}>If you have already Registerd click <a href="/Login">here</a></h5>
      </Wrapper>
    </Container>
  );
};

export default Signup;
