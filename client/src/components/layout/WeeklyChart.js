import axios from 'axios';
import * as React from "react";
import { useEffect, useState  } from "react";
import { useTheme } from "@mui/material/styles";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import Title from "./Title";

// Generate Sales Data
function createData(date, cal, carb, protein, fat) {
  return { date, cal, carb, protein, fat };
}

function value(x) {
  return x ? x : 0;
}

/*const data = [
  createData("26 Feb", 2100, 1250, 200, 300),
  createData("25 Feb", 1940, 1060, 300, 110),
  createData("24 Feb", 2400, 1190, 220, 290),
  createData("23 Feb", 1780, 940, 190, 170),
  createData("22 Feb", 2010, 1250, 300, 190),
  createData("21 Feb", 1740, 1040, 250, 210),
  createData("20 Feb", 1650, 780, 210, 170)
];*/

const WeeklyChart = () => {

  const theme = useTheme();

  const [data, setData] = useState([]);

  useEffect(async () => {
		if(data.length < 1) {
			const res = await axios.get('/api/food/history/range?to=' + new Date().getTime() + "&from=" + new Date(new Date().getTime() - (7 * 24 * 60 * 60 * 1000)).getTime());
			let { snapshots } = res.data;
      let time = new Date();
      let time2 = new Date();
      let tempData = [];
      for(let i = 0; i < 7; i++) {
        tempData.unshift(createData((time.getMonth() + 1) + "/" + time.getDate(), 0, 0, 0, 0));
        time = new Date(time.getTime() - (24 * 60 * 60 * 1000));
      }
      snapshots.forEach(snapshot => {
        time2 = new Date(snapshot.created);
        for(let i = 0; i < 7; i++) {
          if(String(time2.getDate()) == tempData[i].date.split('/')[1]) {
            tempData[i].cal += value(snapshot.data.nutritionalInfo.calories);
            tempData[i].carb += value(snapshot.data.totalNutrients.CHOCDF?.quantity);
            tempData[i].protein += value(snapshot.data.totalNutrients.PROCNT?.quantity);
            tempData[i].fat += value(snapshot.data.totalNutrients.FATRN?.quantity);
          }
        }
      });
      console.log(tempData);
      setData(tempData);
		}
	});

  return (
    <React.Fragment>
      <Title>This Week</Title>
      <ResponsiveContainer>
        <BarChart
          data={data}
          isAnimationActive={true}
          margin={{
            top: 18,
            right: 18,
            bottom: 2,
            left: 24
          }}
        >
          <XAxis dataKey="date" />
          <YAxis></YAxis>
          <Tooltip />
          <Legend />
          <Bar
            dataKey="cal"
            name="Calories"
            fill={theme.palette.primary.light}
          />
          <Bar
            dataKey="carb"
            name="Carbohydrates"
            stackId="b"
            fill={theme.palette.secondary.light}
          />
          <Bar
            dataKey="protein"
            name="Protein"
            stackId="b"
            fill={theme.palette.secondary.main}
          />
          <Bar
            dataKey="fat"
            name="Fats"
            stackId="b"
            fill={theme.palette.secondary.dark}
          />
        </BarChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}

export default WeeklyChart;