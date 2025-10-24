import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "./App.css";
import ProductDetails from "./ProductDetails";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./Home";
import Cart from "./Cart";
import { CartProvider } from "./context";
import AboutPage from "./AboutPage"
import LoginPage from "./LoginPage"
import { SearchProvider } from "./SearchContext";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
function App() {
 


  return (
    <CartProvider>
<SearchProvider>
    <Router>
      <Navbar  />
      <Routes>
      
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
                 <Route path="/" element={<Home />} />
                 <Route path="/about" element={<AboutPage />} />
   <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
    </SearchProvider>
   </CartProvider>
  );
}

export default App;