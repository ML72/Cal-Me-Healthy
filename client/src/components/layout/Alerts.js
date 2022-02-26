import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

const Alerts = ({ alerts }) => {

  if(alerts && alerts.length > 0) {
    return (
			<Box my={2} mx="auto" px={2} sx={{ width: Math.min(window.innerWidth, 600) }}>
				<Stack sx={{ width: '100%' }} spacing={2}>
					{
						alerts.map(alert => (
							<Alert key={alert.id} severity={alert.alertType}>{alert.msg}</Alert>
						))
					}
				</Stack>
			</Box>
    );
  }

  return null;
}

Alerts.propTypes = {
  alerts: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  alerts: state.alert
})

export default connect(mapStateToProps)(Alerts);