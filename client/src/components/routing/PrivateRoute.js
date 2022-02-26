import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';

const PrivateRoute = ({ children, auth: { isAuthenticated, loading }}) => {
    
    if(!isAuthenticated && !loading) {
        setAlert('Please login to access this page', 'danger');
        return (<Navigate to='/signin' />)
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