import React, { Fragment } from 'react';
import Typography from '@mui/material/Typography';

const NotFound = () => {

  return (
    <Fragment>
      <Typography variant="h1" component="div" align="center" sx={{ my: "1rem" }}>
        No page found :(
      </Typography>
    </Fragment>
  );
}

export default NotFound;