import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom'
import Navbar from './components/navbar';
// import 'bootstrap/dist/css/bootstrap.css'

import LoginPage from './Pages/LoginPage'
import SignupPage from './Pages/SignUpPage';
import firebase from './components/firebase/config';
import {
  getAuth,
  onAuthStateChanged,
} from 'firebase/auth';
import MyProfile from './Pages/user/MyProfile';
import Admin from './components/admin/Admin'
import Product from './components/user/Products/Product';
// import Two from './components/user/Products/Two';
import PaymentSuccess from './components/user/Products/order/PaymentSuccess';
import Address from './components/user/Products/order/Address';
import SubscribedEmail from './components/admin/SubscribedEmail';
import Terms from './components/TermsConditions';
import FContactee from './components/Contact';
import Privacy from './components/PrivacyPolicy';
import Return from './components/Return';
import Pay from './components/user/Products/order/Pay'

import "@stripe/stripe-js";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route element={<App />} path='/' />
        <Route element={<SignupPage />} path='/accounts/signup' />
        <Route element={<LoginPage />} path='/accounts/login' />
        <Route element={<MyProfile/>} path='/accounts/myprofile' />
        <Route element={<Admin/>} path='/admin/panel' />
        <Route path="/product/:productId" element={<Product/>} />
        <Route element={<PaymentSuccess/>} path='/product/orderConfirmed/:payId/:productId'/>
        <Route element={<Address/>} path='/payment/addressFor/:productId'/>
        <Route element={<SubscribedEmail/>} path='/admin/panel/subcriptions'/>
        <Route element={<FContactee/>} path='/contact'/>
        <Route element={<Terms/>} path='/terms-and-condtions'/>
        <Route element={<Privacy/>} path='/privacy-and-policy'/>
        <Route element={<Return/>} path='/cancel-and-return'/>
      </Routes>
    </Router>
  </React.StrictMode>
);