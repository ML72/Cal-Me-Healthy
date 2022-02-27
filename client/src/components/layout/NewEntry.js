import * as React from "react";
import { useTheme } from "@mui/material/styles";
import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";
import Title from "./Title";

// Generate Sales Data
function createData(name, amount) {
  return { name, amount };
}

const data1 = [
  createData("a", 180),
  createData("b", 350),
  createData("c", 700),
  createData("d", 930)
];

const data2 = [
  createData("a", 230),
  createData("b", 600),
  createData("c", 1200),
  createData("d", 500)
];

const NewEntry = () => {
  const theme = useTheme();

  return (
    <React.Fragment>
      <Title>Summary</Title>
      <ResponsiveContainer>
        <PieChart
          margin={{
            top: 10,
            right: 5,
            bottom: 10,
            left: 5
          }}
        >
          <Pie
            data={data1}
            dataKey="amount"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={50}
            fill={theme.palette.primary.main}
          />
          <Pie
            data={data2}
            dataKey="amount"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill={theme.palette.secondary.main}
          />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}

export default NewEntry;