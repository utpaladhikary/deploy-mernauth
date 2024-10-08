import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import { useState } from 'react';
import RefreshHandler from './pages/RefreshHandler';

function App() {
  
  const [isAuth, setIsAuth] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuth ? element : <Navigate to='/login'/>;
  }
  return (
    <div className="App">
      <RefreshHandler setIsAuth={setIsAuth}/>
      <Routes>
        <Route path='/' element={<Navigate to='/login'/>} />
        <Route path='/home' element={<PrivateRoute element={<Home/>}/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/login' element={<Login/>} />
      </Routes>
    </div>
  );
}

export default App;
