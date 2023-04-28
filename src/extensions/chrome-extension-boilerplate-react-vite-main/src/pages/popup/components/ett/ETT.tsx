import React, { useEffect, useRef, useState } from "react";
import ExtPay from "extpay";
import { Typography, Button, Box, LinearProgress } from "@mui/material";
import XLSX, { read, writeFileXLSX, set_cptable } from "xlsx";
import * as log from "loglevel";
import ExcelProcessor from "./../process/ExcelProcessor";

const ll = log.getLogger("ETT");
import process from "process";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

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
  const [processor, setProcessor] = useState(null);
  const [functions, setFunctions] = useState(null);
  const [selectedFunction, setSelectedFunction] = useState(null);

  const inputRef = useRef(null);

  useEffect(() => {
    ll.debug("ETT initialized.", workbook);
  }, []);

  useEffect(() => {
    ll.debug("functions changed", functions);
  }, [functions]);

  useEffect(() => {
    ll.debug("workbook created from upload", workbook);
    (async () => {
      const newProcessor = new ExcelProcessor({}, workbook);
      await newProcessor.init();
      setProcessor(newProcessor);
      setFunctions(newProcessor.getFunctions());
    })();
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

  async function processWorkbook(workbook, functionsArray) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve) => {
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
      const newProcessedWorkbook = await processor.processWorkbook(
        functionsArray,
        (progress) => {
          ll.debug("Got processing progress", progress);
          setStatus((p) => {
            return {
              ...p,
              isProcessing: progress.percentage < 100,
              value: progress.percentage,
            };
          });
        }
      );
      ll.debug("Got processed workbook", newProcessedWorkbook);
      resolve(newProcessedWorkbook);
    });
  }

  return (
    <div className="ETT">
      <Box sx={{ marginTop: "15px" }}></Box>
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
      <Box sx={{ marginTop: "15px" }}></Box>
      <div>
        <Box sx={{ minWidth: 280 }}>
          <FormControl sx={{ minWidth: 280 }}>
            <InputLabel id="demo-simple-select-label">Function Name</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              value={selectedFunction}
              label="Function Name"
              onChange={(e) => {
                const newFunction = e.target.value;
                setSelectedFunction(newFunction);
              }}
            >
              {(functions || []).map((f) => {
                return (
                  <MenuItem key={f.name} value={f.name}>
                    {f.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
      </div>
      <Box sx={{ marginTop: "15px" }}></Box>
      {(() => {
        if (status.isProcessing === false) {
          return (
            <div>
              <Box sx={{ marginTop: "15px" }}></Box>
              {(() => {
                if (workbook) {
                  return (
                    <Button
                      onClick={async () => {
                        const processedWorkbook = await processWorkbook(
                          workbook,
                          [
                            functions.filter(
                              (f) => f.name === selectedFunction
                            )[0],
                          ]
                        );
                        ll.debug(
                          "setting processed workbook",
                          processedWorkbook
                        );
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
      <Box sx={{ marginTop: "15px" }}></Box>
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
      <Box sx={{ marginTop: "15px" }}></Box>
      {(() => {
        if (status.value === 100 && processedWorkbook) {
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

      <Button
        onClick={async () => {
          chrome.runtime.sendMessage({ greeting: "hello" }, (response) => {
            ll.debug("got message back", response);
          });
        }}
      >
        SEND TASK TO BG
      </Button>
      <Button
        onClick={() => {
          (async () => {
            const [tab] = await chrome.tabs.query({
              active: true,
              lastFocusedWindow: true,
            });
            if (tab?.id !== undefined) {
              const response = await chrome.tabs.sendMessage(tab.id, {
                greeting: "hello",
              });
              // do something with response here, not outside the function
              ll.debug("got back response from content script: ", response);
            }
          })();
        }}
      >
        SEND TASK TO CONTENT SCRIPT
      </Button>
      <Button
        onClick={() => {
          (async () => {
            const iframe = document.getElementById("sanbdox-bridge");
            const message = {
              command: "eval",
              code: `
                async function run() {
                    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
                    const data = await response.json();
                    return data;
                  }
                run()
                  .then(data => { console.log(data); return data; })
                `,
            };
            const res = await processor.runInSandbox(iframe, message);
            ll.debug("got message from sandbox", res);
          })();
        }}
      >
        SEND TASK TO SANDBOX
      </Button>
    </div>
  );
};

export default ETT;
