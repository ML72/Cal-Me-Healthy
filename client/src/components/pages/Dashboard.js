import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import Typography from '@mui/material/Typography';
  
const Dashboard = () => {

  // const history = useHistory();
  // const moveTo = () => {

  // }

  return (
    <Fragment>
      <Typography variant="h1" component="div" align="center" sx={{ my: "1rem" }}>
        Dashboard
      </Typography>

      {/* <button onClick="history.push('/upload.js')"> Upload new food image! </button> */}

      </Fragment>
  );
}

export default Dashboard;