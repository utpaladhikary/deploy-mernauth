import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

function SignUp() {

  const [signUpInfo, setSignUpInfo] = useState({
    name: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e)=>{
    const {name, value} = e.target;
    // console.log(name, value);
    const copySignUpInfo = {...signUpInfo};
    copySignUpInfo[name] = value;
    setSignUpInfo(copySignUpInfo);
  }
  // console.log('signUpInfo ->', signUpInfo);

  const handleSignUp = async (e) => {
    e.preventDefault();
    const {name, email, password} = signUpInfo;
    if(!name || !email || !password) {
      return handleError('All fields are required !!!')
    }
    try {
      const url = "http://localhost:8080/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers:{
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify(signUpInfo)
      })
      const result = await response.json();
      const {success, message, error} = result;
      if(success)
      {
        handleSuccess(message);
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
      <h1>Sign Up</h1>
      <form onSubmit={handleSignUp}>
      <div>
          <label htmlFor='name'>Name</label>
          <input 
            onChange={handleChange}
            type="text"
            name="name"
            autoFocus
            placeholder='Enter Name'
            value={signUpInfo.name}
          />
        </div>
        <div>
          <label htmlFor='email'>Email</label>
          <input 
            onChange={handleChange}
            type="email"
            name="email"
            autoFocus
            placeholder='Enter Email'
            value={signUpInfo.email}
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
            value={signUpInfo.password}
          />
        </div>
        <button type='submit'>Signup</button>
        <span>Already have an account ?
          <Link to="/login">Login</Link>
        </span>
      </form>
      <ToastContainer/>
    </div>
  )
}

export default SignUp