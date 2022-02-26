import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/auth';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {

  let pages = [];
  if(!isAuthenticated) {
    pages = [{text: 'Home', link: '/'},
      {text: 'Sign In', link: '/signin'},
      {text: 'Sign Up', link: '/signup'}];
  } else {
    pages = [{text: 'Dashboard', link: '/dashboard'},
      {text: 'History', link: '/history'},
      {text: 'Analytics', link: '/analytics'}];
  }

  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" style={{ background: "#b3e9d0", color: "#004928" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            CalMeHealthy
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <Link to={page.link} key={page.text} style={{ textDecoration: 'none' }}>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page.text}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            CalMeHealthy
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Link to={page.link} key={page.text} style={{ textDecoration: 'none' }}>
                <Button
                  style={{ color: "#004928" }}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page.text}
                </Button>
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            { isAuthenticated && !loading ?
              (<Button
                style={{ color: "#004928" }}
                onClick={logout}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Log Out
              </Button>
              ) : (<Fragment></Fragment>)
            }
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  logout: PropTypes.func.isRequired,
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);