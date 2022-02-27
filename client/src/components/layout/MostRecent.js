import axios from 'axios';
import * as React from "react";
import { useEffect, useState  } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Title from "./Title";

const MostRecent = () => {

	const [data, setData] = useState({
		name: "",
		calories: 0,
		date: new Date()
	});

	useEffect(async () => {
		if(data.name == "" || data.calories == 0) {
			const res = await axios.get('/api/food/entry');
			let { snapshot } = res.data;
			setData(
				{
					name: snapshot.data.foodName,
					calories: snapshot.data.nutritionalInfo.calories,
					date: new Date(snapshot.created)
				}
			);
		}
	});
	
  return (
    <React.Fragment>
      <Title>Last Entry</Title>
      <Typography component="p" variant="h5">
        { data.name }
      </Typography>
      <Typography
        component="p"
        color="secondary.main"
        variant="h6"
        sx={{ py: 1 }}
      >
        { data.calories }K CALORIES
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        <Box color="text.primary" display="inline">
          { String(data.date.getHours()).padStart(2, '0') }:{ String(data.date.getMinutes()).padStart(2, '0') }
        </Box>{" "}
        on { data.date.getMonth() + 1}/{ data.date.getDate() }/{ data.date.getFullYear() }
      </Typography>
    </React.Fragment>
  );
}

export default MostRecent;