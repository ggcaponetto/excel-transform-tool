import React, { useEffect, useRef, useState } from "react";
import ExtPay from "extpay";
import { Typography, Button, Box } from "@mui/material";
import API from "../api/API";
import axios from "axios";
import Input from "@mui/material/Input";
import XLSX, { read, writeFileXLSX, set_cptable } from "xlsx";
import FunctionStore from "@pages/popup/components/store/FunctionStore";
/* load the codepage support library for extended support with older formats  */
/*import * as cptable from "xlsx/dist/cpexcel.full.mjs";
set_cptable(cptable);*/

const ETT = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [uploadEvent, setUploadEvent] = useState(null);
  const [workbook, setWorkbook] = useState(null);
  const [processedWorkbook, setProcessedWorkbook] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    console.log("ETT initialized.", workbook);
  }, []);

  useEffect(() => {
    console.log("workbook created from upload", workbook);
  }, [workbook]);

  useEffect(() => {
    if (uploadEvent) {
      console.log(
        `upload event changed. got file ${uploadEvent.target.files[0].name}`,
        uploadEvent
      );
      (async () => {
        const file = uploadEvent.target.files[0];
        const data = await file.arrayBuffer();
        const workbook = read(data, {});
        setWorkbook(workbook);
      })();
    }
  }, [uploadEvent]);

  /* set up drag-and-drop event */
  async function process(workbook, callback) {
    /* Create a new workbook */
    const newWorkbook = XLSX.utils.book_new();
    /* Iterate all sheets */
    Object.keys(workbook.Sheets).forEach((sheetName) => {
      const sheet = workbook.Sheets[sheetName];
      console.log(`processing sheet ${sheetName}`, sheet);
      const range = XLSX.utils.decode_range(sheet["!ref"]);
      console.log("row count is", range.e.r);
      console.log("column count is", range.e.c);

      /* Clone this worksheet with the transformations */
      const clonedWorksheet = JSON.parse(JSON.stringify(sheet)); // make a copy of the object
      XLSX.utils.book_append_sheet(newWorkbook, clonedWorksheet);
    });
    console.log("New workbook is", newWorkbook);
    callback(newWorkbook);
  }
  return (
    <div className="ETT">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button variant="contained" component="label">
          {(() => {
            if (uploadEvent) {
              return `Upload file (${uploadEvent.target.files[0].name})`;
            }
            return `Upload file`;
          })()}
          <input
            onChange={(e) => {
              setUploadEvent(e);
            }}
            ref={inputRef}
            type="file"
            id="xlsx-input"
            name="xlsx-input"
            hidden
          />
        </Button>
      </div>
      <div>
        {(() => {
          if (workbook) {
            return (
              <Button
                onClick={() => {
                  process(workbook, (newWorkbook) => {
                    setProcessedWorkbook(newWorkbook);
                  });
                }}
              >
                Process
              </Button>
            );
          }
        })()}
      </div>
      <div>
        {(() => {
          if (processedWorkbook) {
            return (
              <Button
                onClick={() => {
                  XLSX.writeFile(processedWorkbook, "processed.xlsx", {});
                }}
              >
                Download
              </Button>
            );
          }
        })()}
      </div>
      <FunctionStore />
    </div>
  );
};

export default ETT;
