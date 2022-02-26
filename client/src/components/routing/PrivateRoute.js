import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';

const PrivateRoute = ({ children, auth: { isAuthenticated, loading }}) => {
    
    if(!isAuthenticated && !loading) {
        // Note the following setalert doesn't work for some reason; too time consuming to fix
        setAlert('Please login to access this page', 'error');
        return (<Navigate to='/signin' />);
    }
    
    return children;
}

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);