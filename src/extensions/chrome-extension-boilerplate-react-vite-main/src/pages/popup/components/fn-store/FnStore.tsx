import React, { useContext, useEffect, useState } from "react";
import Store from "../store/store";
import * as log from "loglevel";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import "./FnStore.css";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const ll = log.getLogger("FnStore.tsx");

import process from "process";

const isLogsEnabled = false;
if (process.env.VITE_ENV === "development" && isLogsEnabled) {
  ll.setLevel(log.levels.DEBUG);
} else {
  ll.setLevel(log.levels.WARN);
}

function createData(
  name: string,
  comment: number,
  status: number,
  order: number
) {
  return {
    name,
    comment,
    status,
    order,
  };
}

function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.comment}</TableCell>
        <TableCell align="right">{row.status}</TableCell>
        <TableCell align="right">{row.order}</TableCell>
        <TableCell align="right">
          <IconButton>
            <DeleteIcon></DeleteIcon>
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            Some collapsable content
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export function CollapsibleTable(props) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Name</TableCell>
            <TableCell align="right">Comment</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Order</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.excelFunctions.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const store = new Store("ett-functions", "functions", {
  keyPath: "type",
});
const FnStore = () => {
  const [excelFunctions, setExcelFunctions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    (async () => {
      const newExcelFunctions = [
        createData("Frozen yoghurt", 159, 6.0, 24),
        createData("Frozen yoghurt", 159, 6.0, 24),
        createData("Frozen yoghurt", 159, 6.0, 24),
        createData("Frozen yoghurt", 159, 6.0, 24),
        createData("Frozen yoghurt", 159, 6.0, 24),
        createData("Frozen yoghurt", 159, 6.0, 24),
        createData("Frozen yoghurt", 159, 6.0, 24),
      ];
      setExcelFunctions(newExcelFunctions);
    })();
  }, []);
  return (
    <div className="FnStore">
      <CollapsibleTable excelFunctions={excelFunctions} />
      <div
        className={"add-function"}
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <IconButton
          style={{
            display: "flex",
          }}
        >
          <AddCircleIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default FnStore;
