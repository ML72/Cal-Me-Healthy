import React, { Fragment, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import setAuthToken from './utils/setAuthToken';
import './App.css';

import Navbar from './components/layout/Navbar';
import Dashboard from './components/pages/Dashboard';
import Signup from './components/pages/Signup';
import Signin from './components/pages/Signin';

if(localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/signin" element={<Signin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
