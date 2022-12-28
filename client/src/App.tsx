import React from "react";
import "./App.css";
import ProductPage from "./pages/ProductPage";
import NavBar from "./components/NavBar";
import Cart from "./components/Cart";
import LoginForm from "./components/LoginForm";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import CreateItem from "./components/CreateItem";
import Footer from "./components/Footer";
import RegistrationForm from "./components/RegistrationForm";
import MainLandingPage from "./components/MainLandingPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={
              <>
              <MainLandingPage/>{" "}
                {/* <ProductPage />{" "} */}
              </>
            }
          />
          <Route path="/catalogue" element={<ProductPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/carts" element={<Cart />} />
          <Route path="/item" element={<CreateItem />} />
        
        </Routes>
        <Footer />
      </BrowserRouter>
      {/* <ReactComponent/> */}
    </>
  );
}

export default App;
