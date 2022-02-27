import axios from 'axios';
import * as React from "react";
import { useEffect, useState  } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import Title from "./Title";

// Generate Order Data
function createData(id, name, date, time, mealType, calCount) {
  return { id, name, date, time, mealType, calCount };
}

const RecentEntries = () => {

  const [rows, setRows] = useState([]);

  useEffect(async () => {
		if(rows.length < 1) {
			const res = await axios.get('/api/food/history/page/1');
			let { snapshots } = res.data;
      while(snapshots.length > 5) {
        snapshots = snapshots.slice(1, snapshots.length);
      }
      let tempRows = [];
      let date = new Date();
      snapshots.forEach(snapshot => {
        date = new Date(snapshot.created);
        tempRows.push({
          id: snapshot._id,
          name: snapshot.data.foodName,
          date: (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear(),
          time: String(date.getHours()).padStart(2, '0') + ":" + String(date.getMinutes()).padStart(2, '0'),
          mealType: snapshot.data.occasion ? snapshot.data.occasion : "",
          calCount: snapshot.data.nutritionalInfo.calories
        });
      });
      if(tempRows.length < 1) {
        tempRows.push({
          id: "",
          name: "No recent entries",
          date: "",
          time: "",
          mealType: "",
          calCount: 0
        });
      }
      setRows(tempRows);
		}
	});

  return (
    <React.Fragment>
      <Title>Recent Entries</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Entry Name</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
            <TableCell align="right">Calories</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.time}</TableCell>
              <TableCell align="right">{row.calCount + ' kCal'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}

export default RecentEntries;