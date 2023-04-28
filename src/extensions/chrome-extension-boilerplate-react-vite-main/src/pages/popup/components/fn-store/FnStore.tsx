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
import SaveIcon from "@mui/icons-material/Save";
import { JSHINT } from "jshint";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import axios from "axios";

const ll = log.getLogger("FnStore");
import process from "process";
import FnEditor from "@pages/popup/components/fn-store/components/FnEditor";
import TextField from "@mui/material/TextField";
import messaging from "./../messaging/messaging";
import { bool } from "prop-types";
import LibraryDownloader from "@pages/popup/components/fn-store/components/LibraryDownloader";
const isLogsEnabled = true;
if (process.env.VITE_ENV === "development" && isLogsEnabled) {
  ll.setLevel(log.levels.DEBUG);
} else {
  ll.setLevel(log.levels.WARN);
}

ll.debug("jshint import", JSHINT);

const defaultFunction = createData(
  "New Function",
  "My new function",
  `async function run() {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    const data = await response.json();
    return data;
  }
run().then(data => { console.log(data); return data; });`
);
function createData(name, comment, data) {
  return {
    name,
    comment,
    data,
  };
}

function Row(props: {
  row: ReturnType<typeof createData>;
  onDelete: ReturnType<typeof Function>;
  onEdit: ReturnType<typeof Function>;
  onSave: ReturnType<typeof Function>;
  tempExcelFunctions: ReturnType<any>;
}) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [jshintData, setJsHintData] = useState(null);
  const currentRow = props.tempExcelFunctions[props.row.name] || props.row;
  const isEdited = (() => {
    const hasTempFn = props.tempExcelFunctions[props.row.name] !== undefined;
    return (
      hasTempFn &&
      JSON.stringify(props.tempExcelFunctions[props.row.name]) !==
        JSON.stringify(props.row)
    );
  })();
  const hasJsHintErrors = (jshintData?.errors || []).length > 0;
  const onChange = (newRow) => {
    const oldRow = props.row;
    props.onEdit(oldRow, newRow);
  };
  const onSave = (oldRow, newRow) => {
    props.onSave(oldRow, newRow);
  };
  useEffect(() => {
    console.log("tempExcelFunctions changed", {
      tempFunctions: props.tempExcelFunctions,
      row: props.row,
    });
  }, [props.tempExcelFunctions, props.row]);
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
          <TextField
            id="standard-basic"
            variant="standard"
            value={currentRow.name}
            onChange={(e) => {
              onChange({
                ...row,
                name: e.target.value,
              });
            }}
          />
        </TableCell>
        <TableCell align="left">
          <TextField
            id="standard-basic"
            variant="standard"
            value={currentRow.comment}
            onChange={(e) => {
              onChange({
                ...row,
                comment: e.target.value,
              });
            }}
          />
        </TableCell>
        <TableCell align="left">
          <IconButton
            onClick={() => {
              props.onDelete(row);
            }}
          >
            <DeleteIcon></DeleteIcon>
          </IconButton>
          {(() => {
            if (isEdited) {
              return (
                <IconButton
                  disabled={hasJsHintErrors}
                  onClick={() => {
                    ll.debug("onSave");
                    onSave(props.row, currentRow);
                  }}
                >
                  <SaveIcon></SaveIcon>
                </IconButton>
              );
            }
          })()}
        </TableCell>
        <TableCell align="left">
          {hasJsHintErrors ? <ErrorOutlineIcon /> : null}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <FnEditor
              row={props.row}
              onEdit={props.onEdit}
              onJsHint={(jshintData) => {
                setJsHintData(jshintData);
              }}
            ></FnEditor>
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
            <TableCell align="left">Comment</TableCell>
            <TableCell align="left">Actions</TableCell>
            <TableCell align="left">Errors</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.excelFunctions.map((row) => (
            <Row
              key={row.name}
              row={row}
              onDelete={props.onDelete}
              onEdit={props.onEdit}
              onSave={props.onSave}
              tempExcelFunctions={props.tempExcelFunctions}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export const store = new Store("transform-functions", "functions", {
  keyPath: "name",
});
export const storeIndices = [
  {
    name: "name",
    unique: false,
  },
  {
    name: "comment",
    unique: false,
  },
];
const FnStore = () => {
  const [templateFunctions, setTemplateFunctions] = useState(null);
  const [excelFunctions, setExcelFunctions] = useState([]);
  const [libraryDownload, setLibraryDownload] = useState(null);
  const [tempExcelFunctions, setTempExcelFunctions] = useState({});

  useEffect(() => {
    /* fetch the template functions from the public github repo */
    (async () => {
      const templateFunctionsResponse = await axios.get(
        `https://raw.githubusercontent.com/ggcaponetto/excel-transform-tool/main/functions-repo/basic.json`
      );
      ll.debug("got template functions", templateFunctionsResponse);
      setTemplateFunctions(
        templateFunctionsResponse.data.map((d) => {
          return {
            ...d,
            isTemplate: true,
          };
        })
      );
    })();
  }, []);
  const update = async () => {
    ll.debug("functions are loading from the db...");
    const dbInstance = await store.open((objectStore) => {
      ll.debug("creating store indices for the functions component");
      storeIndices.forEach((index) => {
        objectStore.createIndex(index.name, index.name, {
          unique: index.unique,
        });
      });
    });
    ll.debug("functions have been loaded");
    const functions = await store.getAll();
    setExcelFunctions(functions);
  };
  useEffect(() => {
    update();
  }, []);
  useEffect(() => {
    /* dispatch an event every time the functions change so that other tabs can react to it */
    window.dispatchEvent(
      new CustomEvent(`${messaging.prefix}-tabs-message`, {
        detail: {
          type: "function-update",
        },
      })
    );
  }, [excelFunctions]);
  const onCreateNew = async () => {
    await store.write([
      {
        ...defaultFunction,
        name: `New Function (${new Date().toLocaleString()})`,
      },
    ]);
    ll.debug("stored new function", defaultFunction);
    await update();
  };
  const onDownloadFromLibrary = async () => {
    setLibraryDownload(
      <LibraryDownloader
        onClose={() => {
          setLibraryDownload(null);
        }}
        onLoad={async () => {
          ll.debug(
            "loading the community library",
            templateFunctions.map((f) => {
              return {
                ...f,
                name: `lib ${f.name}`,
              };
            })
          );
          const mergedFunctions = [
            ...(templateFunctions || []),
            ...(excelFunctions || []),
          ];
          await store.write(mergedFunctions);
          ll.debug("stored new function", {
            defaultFunction,
            mergedFunctions,
          });
          await update();
          setLibraryDownload(null);
        }}
      />
    );
  };
  const onDelete = async (fnToDelete) => {
    ll.debug("deleting function", fnToDelete);
    await store.deleteEntry(fnToDelete.name);
    await update();
  };
  const onEdit = async (oldRow, newRow) => {
    ll.debug("editing function", newRow);
    setTempExcelFunctions((p) => {
      const newTempExcelFunctions = {
        ...p,
      };
      newTempExcelFunctions[oldRow.name] = undefined;
      newTempExcelFunctions[newRow.name] = newRow;
      return newTempExcelFunctions;
    });
  };
  const onSave = async (oldRow, newRow) => {
    ll.debug("about to save a function", {
      oldRow,
      newRow,
    });
    await store.deleteEntry(oldRow.name);
    await store.deleteEntry(newRow.name);
    await store.write([newRow]);
    /* After saving an element, we need to update the temp functions store and remove the edits */
    const newTempFunctions = {
      ...tempExcelFunctions,
    };
    delete newTempFunctions[oldRow.name];
    delete newTempFunctions[newRow.name];
    setTempExcelFunctions(newTempFunctions);
    await update();
  };
  return (
    <div className="FnStore">
      {libraryDownload}
      <CollapsibleTable
        excelFunctions={excelFunctions}
        tempExcelFunctions={tempExcelFunctions}
        onDelete={onDelete}
        onEdit={onEdit}
        onSave={onSave}
      />
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
          onClick={onCreateNew}
        >
          <AddCircleIcon />
        </IconButton>
        <IconButton
          style={{
            display: "flex",
          }}
          onClick={onDownloadFromLibrary}
        >
          <CloudDownloadIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default FnStore;
