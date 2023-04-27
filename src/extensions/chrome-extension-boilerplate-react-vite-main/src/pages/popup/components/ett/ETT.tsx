import React, { useEffect, useRef, useState } from "react";
import ExtPay from "extpay";
import { Typography, Button, Box, LinearProgress } from "@mui/material";
import XLSX, { read, writeFileXLSX, set_cptable } from "xlsx";
import * as log from "loglevel";
import ExcelProcessor from "./../process/ExcelProcessor";
const ll = log.getLogger("ETT");
import process from "process";
const isLogsEnabled = true;
if (process.env.VITE_ENV === "development" && isLogsEnabled) {
  ll.setLevel(log.levels.DEBUG);
} else {
  ll.setLevel(log.levels.WARN);
}

const ETT = () => {
  const [status, setStatus] = useState({
    isProcessing: false,
    isReadyToDownload: false,
    value: 0,
  });
  const [uploadEvent, setUploadEvent] = useState(null);
  const [workbook, setWorkbook] = useState(null);
  const [processedWorkbook, setProcessedWorkbook] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    ll.debug("ETT initialized.", workbook);
  }, []);

  useEffect(() => {
    ll.debug("workbook created from upload", workbook);
  }, [workbook]);

  useEffect(() => {
    if (uploadEvent) {
      ll.debug(
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

  async function process(workbook) {
    return new Promise((res) => {
      /* Create a new workbook */
      setStatus((p) => {
        return {
          ...p,
          isProcessing: true,
        };
      });
      const newWorkbook = XLSX.utils.book_new();
      /* Iterate all sheets */
      Object.keys(workbook.Sheets).forEach((sheetName) => {
        const sheet = workbook.Sheets[sheetName];
        ll.debug(`processing sheet ${sheetName}`, sheet);
        /* Clone this worksheet with the transformations */
        const clonedWorksheet = JSON.parse(JSON.stringify(sheet)); // make a copy of the object
        XLSX.utils.book_append_sheet(newWorkbook, clonedWorksheet);
      });
      ll.debug("New workbook is", newWorkbook);
      const processor = new ExcelProcessor({}, newWorkbook);
      processor.processWorkbook((progress) => {
        ll.debug("Got processing progress", progress);
        setStatus((p) => {
          return {
            ...p,
            isProcessing: progress.percentage < 100,
            value: progress.percentage,
          };
        });
      });
    });
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
      {(() => {
        if (status.isProcessing === false) {
          return (
            <div>
              {(() => {
                if (workbook) {
                  return (
                    <Button
                      onClick={async () => {
                        const processedWorkbook = await process(workbook);
                        setProcessedWorkbook(processedWorkbook);
                      }}
                    >
                      Process
                    </Button>
                  );
                }
              })()}
            </div>
          );
        }
      })()}
      {(() => {
        if (status.isProcessing) {
          return (
            <LinearProgress
              variant="determinate"
              value={Math.round(status.value)}
            />
          );
        }
      })()}
      {(() => {
        if (status.isReadyToDownload && processedWorkbook) {
          return (
            <div>
              <Button
                onClick={() => {
                  XLSX.writeFile(processedWorkbook, "processed.xlsx", {});
                }}
              >
                Download
              </Button>
            </div>
          );
        }
      })()}
    </div>
  );
};

export default ETT;
