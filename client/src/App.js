import React, { Fragment, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';

// Components
import Navbar from './components/layout/Navbar';
import Dashboard from './components/pages/Dashboard';
import Signup from './components/pages/Signup';
import Signin from './components/pages/Signin';
import NotFound from './components/pages/NotFound';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

// Styles
import { createTheme, ThemeProvider } from "@mui/material/styles";

if(localStorage.token) {
  setAuthToken(localStorage.token);
}


const ctheme = createTheme({
  palette: {
    primary: {
      // green primary
      main: "#01B763"
    },
    secondary: {
      // purple secondary
      main: "#6e62f9"
    },
    error: {
      // red error
      main: '#f4365d',
    },
  },
  spacing: 10,
  divider: "rgba(0,55,30,0.31)",
  shape: {
    borderRadius: 6
  },
  typography: {
    fontSize: 14,
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    fontWeightBold: 800
  }
});

const App = () => {

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <ThemeProvider theme={ctheme}>
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Dashboard />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/signin" element={<Signin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
