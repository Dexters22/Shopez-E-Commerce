import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Authentication from './pages/Authentication';

import Cart from './pages/customer/Cart';
import Profile from './pages/customer/Profile';
import CategoryProducts from './pages/customer/CategoryProducts';
import IndividualProduct from './pages/customer/IndividualProduct';

import Admin from './pages/admin/Admin';
import AllProducts from './pages/admin/AllProducts';
import AllUsers from './pages/admin/AllUsers';
import AllOrders from './pages/admin/AllOrders';
import NewProduct from './pages/admin/NewProduct';
import UpdateProduct from './pages/admin/UpdateProduct';

import axios from 'axios';

function App() {
  const [bannerImg, setBannerImg] = useState(''); // Step 1: State to hold banner URL

  useEffect(() => {
    // Step 2: Fetch banner image from the API when the component mounts
    axios.get('http://localhost:6001/fetch-banner')
      .then(response => {
        setBannerImg(response.data); // Set banner URL to state
      })
      .catch(error => {
        console.error("There was an error fetching the banner!", error);
      });
  }, []); // Run once when component mounts

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/auth' element={<Authentication />} />
        <Route path='' element={<Home bannerImg={bannerImg} />} /> {/* Pass bannerImg to Home */}
        <Route path='/cart' element={<Cart />} />
        <Route path='/product/:id' element={<IndividualProduct />} />
        <Route path='/category/:category' element={<CategoryProducts />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/auth' element={<Authentication />} />

        <Route path='/admin' element={<Admin />} />
        <Route path='/all-products' element={<AllProducts />} />
        <Route path='/all-users' element={<AllUsers />} />
        <Route path='/all-orders' element={<AllOrders />} />
        <Route path='/new-product' element={<NewProduct />} />
        <Route path='/update-product/:id' element={<UpdateProduct />} />
      </Routes>
    </div>
  );
}

export default App;
