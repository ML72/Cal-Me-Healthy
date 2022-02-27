import * as React from "react";
import Link from "@mui/material/Link";
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

const rows = [
  createData(0, "morning brunch", "26 Feb 2022", "10:35", "Breakfast", 350),
  createData(1, "late dinner", "25 Feb 2022", "23:12", "Dinner", 470),
  createData(2, "movies snack", "25 Feb 2022", "16:23", "Snack", 115),
  createData(3, "cont breakfast", "25 Feb 2022", "07:45", "Breakfast", 540),
  createData(4, "fast food trip", "24 Feb 2022", "17:34", "Dinner", 480),
  createData(5, "morning brunch", "24 Feb 2022", "10:35", "Breakfast", 350),
  createData(6, "late dinner", "23 Feb 2022", "23:12", "Dinner", 470),
  createData(7, "movies snack", "23 Feb 2022", "16:23", "Snack", 115),
  createData(8, "cont breakfast", "23 Feb 2022", "07:45", "Breakfast", 540),
  createData(9, "fast food trip", "22 Feb 2022", "17:34", "Dinner", 480)
];

const slicedRows = rows.slice(0, 5);

function preventDefault(event) {
  event.preventDefault();
}

const RecentEntries = () => {
  return (
    <React.Fragment>
      <Title>Recent Entries</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Entry Name</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Category</TableCell>
            <TableCell align="right">Calories</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {slicedRows.map((slicedRow) => (
            <TableRow key={slicedRow.id}>
              <TableCell>{slicedRow.name}</TableCell>
              <TableCell>{slicedRow.date}</TableCell>
              <TableCell>{slicedRow.time}</TableCell>
              <TableCell>{slicedRow.mealType}</TableCell>
              <TableCell align="right">{`${slicedRow.calCount} kCal`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        View more
      </Link>
    </React.Fragment>
  );
}

export default RecentEntries;