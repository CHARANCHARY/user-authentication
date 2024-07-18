import React, {useState} from "react";
import axios from "axios";
import * as Components from './styled';
import { FaEye, FaEyeSlash } from 'react-icons/fa';



function Login() {
    const [passwordShown, setPasswordShown] = useState(false);
    const [inputType, setInputType] = useState('password');
    const [signIn, toggle] = React.useState(true);




    const  [data , setData] = useState({
        username : '',
        email : '',
        password : '',
        confirmpassword: ''
    })
    const  [logindata , setLoginData] = useState({
        email : '',
        password : ''
    })

    const loginChangeHandler = e =>{
        setLoginData({...logindata,[e.target.name] : e.target.value})
    }

    const changeHandler = e =>{
        setData({...data,[e.target.name] : e.target.value})
    }



    const registerHandler = e =>{
        e.preventDefault();
        axios.post('http://localhost:5000/register', data)
        .then(
            res => {
                alert(res.data);
                setData({
                    username: '',
                    email: '',
                    password: '',
                    confirmpassword: ''
                });
            }
            
        )
        .catch(error => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                alert(error.response.data);
                console.log(error.response.data);
            } else if (error.request) {
                // The request was made but no response was received
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        })
        console.log(data);

    }
    const loginHandler = e =>{
        e.preventDefault();
        axios.post('http://localhost:5000/login' , logindata)
        .then(
            res => {alert("Succefully Login");
            localStorage.setItem('token', data.token);
            }
        
        )
        .catch(error => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                alert(error.response.data);
                console.log(error.response.data);
            } else if (error.request) {
                // The request was made but no response was received
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        })
       

    }



    const togglePasswordVisiblity = () => {
        setPasswordShown(!passwordShown);
        setInputType(passwordShown ? 'password' : 'text');
      };
     return(
        <center>
         <Components.Container>
             <Components.SignUpContainer signinIn={signIn}>
                 <Components.Form onSubmit={registerHandler}>
                     <Components.Title>Create Account</Components.Title>
                     <Components.Input type='text' onChange={changeHandler} name="username" placeholder='Name' />
                     <Components.Input type='email' onChange={changeHandler}  name="email" placeholder='Email' />
                     <Components.PasswordDiv>
                        <Components.Input type={inputType} onChange={changeHandler} name="password" placeholder='Password' />
                        <Components.PasswordBtn className="password-toggle-button" onClick={togglePasswordVisiblity}>
                                {passwordShown ? <FaEyeSlash /> : <FaEye />}
                        </Components.PasswordBtn>
                     </Components.PasswordDiv>


                     <Components.PasswordDiv>
                        <Components.Input type={inputType} onChange={changeHandler} name="confirmpassword" placeholder='Confirm Password' />
                        <Components.PasswordBtn className="password-toggle-button" onClick={togglePasswordVisiblity}>
                                {passwordShown ? <FaEyeSlash /> : <FaEye />}
                        </Components.PasswordBtn>
                     </Components.PasswordDiv>
    
                     <Components.Button type="submit"  >Sign Up</Components.Button>
                 </Components.Form>
             </Components.SignUpContainer>

             <Components.SignInContainer signinIn={signIn}>
                  <Components.Form onSubmit={loginHandler}>
                      <Components.Title>Sign in</Components.Title>
                      <Components.Input type='email' onChange={loginChangeHandler} name="email" placeholder='Email' />


                        
                     <Components.PasswordDiv>
                        <Components.Input type={inputType} onChange={loginChangeHandler} name="password" placeholder='Password' />
                        <Components.PasswordBtn className="password-toggle-button" onClick={togglePasswordVisiblity}>
                                {passwordShown ? <FaEyeSlash /> : <FaEye />}
                        </Components.PasswordBtn>
                     </Components.PasswordDiv>

                      <Components.Anchor href='#'>Forgot your password?</Components.Anchor>
                      <Components.Button type="submit">Sigin In</Components.Button>
                  </Components.Form>
             </Components.SignInContainer>

             <Components.OverlayContainer signinIn={signIn}>
                 <Components.Overlay signinIn={signIn}>

                 <Components.LeftOverlayPanel signinIn={signIn}>
                     <Components.Title>Hello, Friend!</Components.Title>
                     <Components.Paragraph>
                         To keep connected with us please login with your personal info
                     </Components.Paragraph>
                     <Components.GhostButton onClick={() => toggle(true)}>
                         Sign In
                     </Components.GhostButton>
                     </Components.LeftOverlayPanel>

                     <Components.RightOverlayPanel signinIn={signIn}>
                       <Components.Title>Welcome Back!</Components.Title>
                       <Components.Paragraph>
                           Enter Your personal details and start journey with us
                       </Components.Paragraph>
                           <Components.GhostButton onClick={() => toggle(false)}>
                               Sigin Up
                           </Components.GhostButton> 
                     </Components.RightOverlayPanel>
 
                 </Components.Overlay>
             </Components.OverlayContainer>

         </Components.Container>\
         </center>
     )
}

export default Login;