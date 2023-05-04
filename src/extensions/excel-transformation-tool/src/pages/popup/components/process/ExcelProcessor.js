import * as log from "loglevel";

const ll = log.getLogger("FnStore");
import process from "process";
import XLSX from "xlsx";
import Store from "../store/store";
import { storeIndices } from "./../fn-store/FnStore";

const isLogsEnabled = true;
if (process.env.VITE_ENV === "development" && isLogsEnabled) {
  ll.setLevel(log.levels.DEBUG);
} else {
  ll.setLevel(log.levels.WARN);
}

const store = new Store("transform-functions", "functions", {
  keyPath: "name",
});
export default function ExcelProcessor(context, workbook) {
  this.context = context;
  this.workbook = workbook;
  this.store = store;
  this.functions = null;
  const init = async () => {
    const dbInstance = await this.store.open((objectStore) => {
      ll.debug(
        "creating store indices for the functions component",
        storeIndices
      );
      storeIndices.forEach((index) => {
        objectStore.createIndex(index.name, index.name, {
          unique: index.unique,
        });
      });
    });
    /* get the stored functions */
    this.functions = await store.getAll();
    ll.debug("functions have been loaded", this.functions);
  };
  const getRange = (sheet) => {
    const range = XLSX.utils.decode_range(sheet["!ref"]);
    // ll.debug("row count is", range.e.r);
    // ll.debug("column count is", range.e.c);
    return range;
  };
  const splitCell = (cellName) => {
    const matches = cellName.match(/^([a-zA-Z]+)(\d+)$/);
    if (matches) {
      const letters = matches[1];
      const numbers = matches[2];
      const result = {
        row: parseInt(numbers),
        column: letters,
      };
      return result;
    } else {
      throw new Error("String does not match expected format");
    }
  };
  const getTotalCellCount = () => {
    let totalCellCount = 0;
    for (const sheetName of Object.keys(this.workbook.Sheets)) {
      let sheet = this.workbook.Sheets[sheetName];
      for (const cellName of Object.keys(sheet).filter(
        (cellName) => !cellName.startsWith("!")
      )) {
        totalCellCount++;
      }
    }
    return totalCellCount;
  };
  const evalInContext = (context, code) => {
    ll.debug("evaluating code", {
      context,
      code,
    });
    function evalInContext() {
      eval(`
        ${code}
        return processCell();
      `);
    }
    evalInContext.call(context);
  };
  const getFunctions = () => this.functions;
  const processWorkbook = (functions, onProgress, maxOperations) => {
    return new Promise((resolveProcessing) => {
      ll.debug("processing workbook...", {
        workbook: this.workbook,
        functions,
        maxOperations,
      });

      let workPromises = [];
      let totalCellCount = getTotalCellCount();
      ll.debug("total cells: " + totalCellCount);
      let tempCellCounter = 0;
      let scratch = {};
      let tempWorkbook = this.workbook;
      for (const sheetName of Object.keys(this.workbook.Sheets)) {
        for (const cellName of Object.keys(
          this.workbook.Sheets[sheetName]
        ).filter((cellName) => !cellName.startsWith("!"))) {
          tempCellCounter++;
          /*let percentage = (tempCellCounter / totalCellCount) * 100;
          ll.debug(
            `cueing processing of cell ${tempCellCounter}/${totalCellCount}`
          );*/
          if (tempCellCounter <= maxOperations) {
            workPromises.push(() => {
              // eslint-disable-next-line no-async-promise-executor
              return new Promise(async (resolve) => {
                const iframe = document.getElementById("sanbdox-bridge");
                const message = {
                  command: "eval",
                  code: functions[0].data,
                  context: {
                    workbook: tempWorkbook,
                    cell: splitCell(cellName),
                    cellName,
                    sheetName,
                    cellValue: tempWorkbook.Sheets[sheetName][cellName].w,
                    range: getRange(tempWorkbook.Sheets[sheetName]),
                    scratch,
                  },
                };
                const evalResponse = await runInSandbox(iframe, message);
                ll.debug("processor got message from sandbox", evalResponse);
                /* overwrite the local workbook with the processed one */
                tempWorkbook = evalResponse.data.result.workbook;
                /* overwrite the scratch file */
                scratch = evalResponse.data.result.scratch;
                this.workbook = tempWorkbook;
                resolve();
              });
            });
          }
        }
      }
      let allResults = [];
      const forEachSeries = async (iterable) => {
        let counter = 0;
        for (const x of iterable) {
          counter++;
          let res = await x(2);
          let percentage =
            (counter / Math.min(totalCellCount, maxOperations)) * 100;
          ll.debug(
            `processed cell ${counter}/${totalCellCount} (${percentage.toFixed(
              2
            )})`,
            res
          );
          allResults.push(res);
          onProgress({
            percentage,
            data: allResults,
            workbook: this.workbook,
          });
        }
      };

      return forEachSeries(workPromises).then(() => {
        ll.debug("all done!");
        resolveProcessing(this.workbook);
      });
    });
  };
  const runInSandbox = async (iframe, message) => {
    return new Promise((resolve) => {
      const messageHandler = (event) => {
        ll.debug("processor got event", event);
        window.removeEventListener("message", messageHandler);
        resolve(event);
      };
      window.addEventListener("message", messageHandler);
      iframe.contentWindow.postMessage(message, "*");
    });
  };
  return {
    init,
    evalInContext,
    processWorkbook,
    getFunctions,
    runInSandbox,
  };
}
