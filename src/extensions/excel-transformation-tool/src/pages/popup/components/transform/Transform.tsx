import React, { useContext, useEffect, useRef, useState } from "react";
import { Typography, Button, Box, Alert } from "@mui/material";
import XLSX, { read } from "xlsx";
import * as log from "loglevel";
import ExcelProcessor from "./../process/ExcelProcessor";
import "./Transform.css";
import ExtPay from "extpay";
const extpay = ExtPay(process.env.VITE_EXTENSIONPAY_ID);

const ll = log.getLogger("Transform");
import process from "process";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import messaging from "./../messaging/messaging";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import PopupContext from "@pages/popup/components/context/popup-context";

const isLogsEnabled = true;
if (process.env.VITE_ENV === "development" && isLogsEnabled) {
  ll.setLevel(log.levels.DEBUG);
} else {
  ll.setLevel(log.levels.WARN);
}
const MAX_CELLS_TO_PROCESS = 10 * 200;
function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number }
) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

const Transform = () => {
  const initialStatus = {
    isProcessing: false,
    isReadyToDownload: false,
    value: 0,
  };
  const [status, setStatus] = useState(initialStatus);
  const [uploadEvent, setUploadEvent] = useState(null);
  const [workbook, setWorkbook] = useState(null);
  const [processedWorkbook, setProcessedWorkbook] = useState(null);
  const [processor, setProcessor] = useState(null);
  const [functions, setFunctions] = useState(null);
  const [selectedFunction, setSelectedFunction] = useState(null);
  const hasValidUploadEvent = !!uploadEvent?.target?.files[0]?.name;
  const popupContext = useContext(PopupContext);
  const inputRef = useRef(null);
  const [errorState, setErrorState] = useState(null);
  const isPro = popupContext?.data?.user?.paid === true;

  const resetInput = () => {
    const input = window.document.getElementById("xlsx-input");
    input.addEventListener("click", function () {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.value = null;
    });
  };
  const reset = () => {
    setStatus(initialStatus);
    setUploadEvent(null);
    setWorkbook(null);
    setProcessedWorkbook(null);
    setSelectedFunction(null);
    resetInput();
  };
  const update = async () => {
    const newProcessor = new ExcelProcessor({}, workbook);
    await newProcessor.init();
    setProcessor(newProcessor);
    setFunctions(newProcessor.getFunctions());
  };

  useEffect(() => {
    ll.debug("Transform initialized.", workbook);
    /* listen to tab messages requests */
    window.addEventListener(
      `${messaging.prefix}-tabs-message`,
      function (event) {
        ll.debug("got tabs message", event);
        if (event.detail.type === "function-update") {
          update();
        }
      }
    );
  }, []);

  useEffect(() => {
    ll.debug("functions changed", functions);
  }, [functions]);

  useEffect(() => {
    ll.debug("workbook created from upload", workbook);
    update();
  }, [workbook]);

  useEffect(() => {
    ll.debug(
      `upload event changed. got file ${uploadEvent?.target?.files[0]?.name}`,
      {
        uploadEvent,
        hasValidUploadEvent,
      }
    );
    if (hasValidUploadEvent) {
      (async () => {
        const file = uploadEvent.target.files[0];
        const data = await file.arrayBuffer();
        const workbook = read(data, {});
        setWorkbook(workbook);
      })();
    } else {
      setWorkbook(null);
    }
  }, [uploadEvent?.target?.files[0]?.name, hasValidUploadEvent]);

  async function processWorkbook(workbook, functionsArray) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      /* Create a new workbook */
      setStatus((p) => {
        return {
          ...initialStatus,
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
      try {
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
          },
          isPro ? Number.POSITIVE_INFINITY : MAX_CELLS_TO_PROCESS,
          (errorMessage) => {
            reject(errorMessage);
          }
        );
        ll.debug("Got processed workbook", newProcessedWorkbook);
        resolve(newProcessedWorkbook);
      } catch (e) {
        ll.error("An unexpected error happened", e);
        reset();
      }
    });
  }

  return (
    <div className="Transform">
      <Box style={{ marginTop: "15px" }}></Box>
      <FormControl sx={{ maxWidth: "80%", width: "100%" }}>
        <div className={"custom-row"}>
          <Button
            variant="contained"
            component="label"
            className={"custom-button"}
          >
            {(() => {
              if (hasValidUploadEvent) {
                return `Re-Upload file`;
              }
              return `Upload file`;
            })()}
            <input
              onChange={(e) => {
                ll.debug("upload event", e);
                if (e?.target?.files[0]?.name) {
                  setUploadEvent(e);
                } else {
                  setUploadEvent(null);
                }
              }}
              ref={inputRef}
              type="file"
              id="xlsx-input"
              name="xlsx-input"
              hidden
            />
          </Button>
          {(() => {
            if (hasValidUploadEvent) {
              return (
                <div className={"custom-row"}>
                  <Box style={{ margin: "15px" }}></Box>
                  <Typography variant={"body1"}>
                    {`Upload file `} <b>{uploadEvent.target.files[0].name}</b>
                  </Typography>
                  <Box style={{ margin: "5px" }}></Box>
                  <CheckCircleIcon />
                </div>
              );
            }
          })()}
        </div>
      </FormControl>
      <Box style={{ marginTop: "15px" }}></Box>
      <FormControl sx={{ maxWidth: "80%", width: "100%" }}>
        <InputLabel id="function-select">Function Name</InputLabel>
        <Select
          labelId="function-select"
          value={selectedFunction || ""}
          label="Function Name"
          onChange={(e) => {
            const newFunction = e.target.value;
            if (newFunction === "") {
              setSelectedFunction(null);
            } else {
              setSelectedFunction(newFunction);
            }
          }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {(functions || []).map((f) => {
            return (
              <MenuItem key={f.name} value={f.name}>
                {f.name}
              </MenuItem>
            );
          })}
        </Select>
        <Box style={{ marginTop: "15px" }}></Box>
        <Typography variant={"body1"}>
          {(() => {
            const func = (functions || []).filter(
              (f) => f.name === selectedFunction
            )[0];
            if (func) {
              return func.comment;
            } else {
              return "";
            }
          })()}
        </Typography>
      </FormControl>
      <Box style={{ marginTop: "30px" }}></Box>
      {(() => {
        if (errorState) {
          return (
            <div>
              <Box style={{ marginTop: "30px" }}></Box>
              <Alert
                severity="error"
                variant="outlined"
                style={{ margin: "10px" }}
              >
                <strong>{errorState.e}</strong>
                <Button
                  onClick={() => {
                    reset();
                    setErrorState(null);
                  }}
                >
                  Reset
                </Button>
              </Alert>
            </div>
          );
        }
      })()}
      <Button
        className={"custom-button"}
        disabled={
          !!workbook === false ||
          status?.isProcessing ||
          selectedFunction === null
        }
        variant="contained"
        onClick={async () => {
          const processedWorkbook = await processWorkbook(workbook, [
            functions.filter((f) => f.name === selectedFunction)[0],
          ]).catch((e) => {
            ll.warn("An error occurred, resetitng everything", e);
            reset();
            setErrorState({ e });
          });
          ll.debug("setting processed workbook", processedWorkbook);
          setProcessedWorkbook(processedWorkbook);
        }}
      >
        <div>
          {status?.isProcessing
            ? "Processing"
            : status.value === 100 && processedWorkbook
            ? "Re-Process"
            : "Process"}
        </div>
        {(() => {
          if (status.isProcessing) {
            return (
              <>
                <Box style={{ marginLeft: "10px" }}></Box>
                <CircularProgressWithLabel value={Math.round(status.value)} />
              </>
            );
          }
        })()}
      </Button>
      <Box style={{ marginTop: "30px" }}></Box>
      {(() => {
        if (status.value === 100 && processedWorkbook) {
          return (
            <Button
              className={"custom-button"}
              variant={"contained"}
              onClick={() => {
                XLSX.writeFile(
                  processedWorkbook,
                  `processed_${uploadEvent.target.files[0].name}`,
                  {}
                );
              }}
            >
              Download
            </Button>
          );
        }
      })()}
      {(() => {
        if (isPro === false) {
          return (
            <Alert
              severity="info"
              variant="outlined"
              style={{ margin: "10px" }}
            >
              <strong>
                The free plan only processes {MAX_CELLS_TO_PROCESS} cells. Get
                unlimited processing with the PRO plan!
              </strong>
              <Box style={{ marginTop: "15px" }}></Box>
              <Button variant={"contained"} onClick={extpay.openPaymentPage}>
                Upgrade to PRO
              </Button>
            </Alert>
          );
        }
      })()}
    </div>
  );
};

export default Transform;
