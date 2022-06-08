
import React from 'react';
import { useState } from 'react';
import './App.css';
import ProductPage from "./pages/ProductPage";
import { userEndPoint } from './Apis';
import axios from 'axios';
import NavBar from './components/NavBar';
import RegistrationForm from './components/RegistrationForm';
import Cart from './components/Cart';
import LoginForm from './components/LoginForm';
import ChangePassword from './components/ChangePassword';

const UserContext = React.createContext(null);
const username = "sagarkhadka";
function App(){
 
   
 
  return (
    <>
      {/* <NavBar/>
     <ProductPage/>
     <RegistrationForm/>
     <LoginForm/>
     <Cart/> */}
     <ChangePassword/>
    </>
  )
    
}

export default App;
