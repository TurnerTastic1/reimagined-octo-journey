import React, { useContext, useState, useEffect } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";

import swal from 'sweetalert';
import Login from '../../../services/auth/login.service';

import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`

input:autofill {
  border: 3px solid darkorange;
}

input:-webkit-autofill {
  border: 3px solid darkorange;
}
`;

function LoginForm(props) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailInput = event => {
    setEmail(event.target.value);
  };

  const handlePasswordInput = event => {
    setPassword(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault(); 
    
    //console.log(email + password);
    const response = await Login(email, password);
    if (response === null) {
      console.log("Error while logging in - null return");
      return null;
    } 
    else if ('message' in response) {
      
      if (!window.localStorage) {
        console.log("Error - localstorage not supported by your browser");
        return null;
      }
      localStorage.setItem('accessToken', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      setTimeout(function(){
        window.location.href = "/";
      },3000);
      
      return null;
    }
  };

  const { switchToSignup } = useContext(AccountContext);

  return (
    <BoxContainer>
      <FormContainer>
    
        <Input type="email" onChange={handleEmailInput} placeholder="Email" />
      
        <Input type="password" onChange={handlePasswordInput} placeholder="Password" />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <MutedLink href="#">Forget your password?</MutedLink>
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton onClick={handleSubmit} type="submit">Signin</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Don't have an account?{" "}
        <BoldLink href="#" onClick={switchToSignup}>
          Signup
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}

export { LoginForm };