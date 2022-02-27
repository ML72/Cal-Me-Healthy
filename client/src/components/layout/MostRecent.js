import * as React from "react";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Title from "./Title";

function preventDefault(event) {
  event.preventDefault();
}

const MostRecent = () => {
  return (
    <React.Fragment>
      <Title>Last Entry</Title>
      <Typography component="p" variant="h5">
        morning brunch
      </Typography>
      <Typography
        component="p"
        color="secondary.main"
        variant="h6"
        sx={{ py: 1 }}
      >
        350 CALORIES
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        <Box color="text.primary" display="inline">
          10:35
        </Box>{" "}
        on 25 February, 2022
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View details
        </Link>
      </div>
    </React.Fragment>
  );
}

export default MostRecent;