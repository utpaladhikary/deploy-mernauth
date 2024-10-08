import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import {ToastContainer} from 'react-toastify';

function Home() {
  
  const [loggedInUser, setLoggedInUser] = useState('');
  const [products, setProducts] = useState('');
  useEffect(()=>{
    setLoggedInUser(localStorage.getItem('loggedInUser'))
  },[]);

  const navigate = useNavigate();

  const handleLogout = (e) => {
    handleSuccess('Successfully logged out !!!');
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    setTimeout(()=>{
      navigate('/login');
    }, 2000)
  }

  const fetchProducts = async () => {
    try {
      const url = "http://localhost:8080/product";
      const header = {
        headers: {
          'Authorization' : localStorage.getItem('token'),
        }
      }
      const response = await fetch(url, header);
      const result = await response.json();
      // console.log(result);
      setProducts(result);
    } catch (error) {
      handleError(error);
    }
  }

  useEffect(()=>{
    fetchProducts();
  },[]);


  return (
    <div>
      <h1>Welcome, {loggedInUser}</h1>
      <button onClick={handleLogout}>Logout</button>
      <div>
        <table border={1}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {
              products && products.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default Home
