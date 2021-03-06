import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

// Components
import PrivateRoute from './components/routing/PrivateRoute';
import Navbar from './components/layout/Navbar';
import Alerts from './components/layout/Alerts';
import Landing from './components/pages/Landing';
import Dashboard from './components/pages/Dashboard';
import Snap from './components/pages/Snap';
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
import Box from '@mui/material/Box';
import AOS from 'aos';
import 'aos/dist/aos.css';

if(localStorage.token) {
  setAuthToken(localStorage.token);
}

AOS.init({
  disable: function () {
      var maxWidth = 800;
      return window.innerWidth < maxWidth;
  },
  mirror: true
});

const ctheme = createTheme({
  palette: {
    primary: {
      // green primary
      main: "#01B763",
      contrastText: "#fff"
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
  divider: "rgba(0,55,30,0.25)",
  shape: {
    borderRadius: 5
  },
  typography: {
    fontSize: 14,
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
          <Box
            sx={{
              background: "linear-gradient(#b3e9d0, #fff, #fff)",
              pt: 1,
              pb: 10,
            }}
          >
            <Alerts />
            <Routes>
              <Route exact path="/" element={<Landing />} />
              <Route exact path="/signup" element={<Signup />} />
              <Route exact path="/signin" element={<Signin />} />
              <Route exact path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route exact path="/snap" element={<PrivateRoute><Snap /></PrivateRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Box>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
