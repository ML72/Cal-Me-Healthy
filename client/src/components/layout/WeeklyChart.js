import * as React from "react";
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

const data = [
  createData("26 Feb", 2100, 1250, 200, 300),
  createData("25 Feb", 1940, 1060, 300, 110),
  createData("24 Feb", 2400, 1190, 220, 290),
  createData("23 Feb", 1780, 940, 190, 170),
  createData("22 Feb", 2010, 1250, 300, 190),
  createData("21 Feb", 1740, 1040, 250, 210),
  createData("20 Feb", 1650, 780, 210, 170)
];

const WeeklyChart = () => {
  const theme = useTheme();

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