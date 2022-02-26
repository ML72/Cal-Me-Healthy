import React, { Fragment } from 'react';
import { Navigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({ isAuthenticated }) => {

  if(isAuthenticated) {
    return (<Navigate to="/dashboard" />);
  }

  return (
    <Fragment>
      <Typography variant="h1" component="div" align="center" sx={{ my: "1rem" }}>
        Landing page
      </Typography>
    </Fragment>
  );
}

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);