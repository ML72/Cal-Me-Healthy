import * as React from "react";
import { Fragment } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";

import MostRecent from "../layout/MostRecent";
import RecentEntries from "../layout/RecentEntries";
import WeeklyChart from "../layout/WeeklyChart";

const Copyright = (props) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        CalMeHealthy
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Dashboard = () => {

  return (
    <Fragment>
      <CssBaseline />

      <Typography component="h1" variant="h4" color="text.primary" align="center">
				Welcome!
			</Typography>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          {/* Daily Stats */}
          <Grid item xs={12}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 320
              }}
            >
              <WeeklyChart />
            </Paper>
          </Grid>
          {/* Recent Entries */}
          <Grid item xs={12} md={7} lg={8}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <RecentEntries />
            </Paper>
          </Grid>
          {/* Last Entry */}
          <Grid item xs={12} md={5} lg={4}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: "100%"
              }}
            >
              <MostRecent />
            </Paper>
          </Grid>
        </Grid>
        <Copyright sx={{ pt: 4 }} />
      </Container>
    </Fragment>
  );
}

export default Dashboard;