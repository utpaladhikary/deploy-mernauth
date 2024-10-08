import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

function Login() {

  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e)=>{
    const {name, value} = e.target;
    // console.log(name, value);
    const copyLoginInfo = {...loginInfo};
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  }
  const handleSignUp = async (e) => {
    e.preventDefault();
    const {email, password} = loginInfo;
    if(!email || !password) {
      return handleError('All fields are required !!!')
    }
    try {
      const url = "http://localhost:8080/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginInfo)
      })
      const result = await response.json();
      const {success, message, error, jwtToken, name} = result;
      if(success)
      {
        handleSuccess(message);
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('loggedInUser', name);
        setTimeout(()=>{
          navigate('/home');
        },2000);
      }
      else if(error){
        const details = error?.details[0].message;
        handleError(details);
      }
      else{
        handleError(message);
      }
      console.log(result);
    } catch (error) {
      handleError(error);
    }
  }
  return (
    <div className='container'>
      <h1>Login</h1>
      <form onSubmit={handleSignUp}>
      
        <div>
          <label htmlFor='email'>Email</label>
          <input 
            onChange={handleChange}
            type="email"
            name="email"
            autoFocus
            placeholder='Enter Email'
            value={loginInfo.email}
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input 
            onChange={handleChange}
            type="password"
            name="password"
            autoFocus
            placeholder='Enter Password'
            value={loginInfo.password}
          />
        </div>
        <button type='submit'>Login</button>
        <span>Already have an account ?
          <Link to="/signup">Sign Up</Link>
        </span>
      </form>
      <ToastContainer/>
    </div>
  )
}

export default Login;