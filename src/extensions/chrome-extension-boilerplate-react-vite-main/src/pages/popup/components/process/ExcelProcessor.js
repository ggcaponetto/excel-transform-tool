import * as log from "loglevel";
const ll = log.getLogger("FnStore");
import process from "process";
import XLSX from "xlsx";

const isLogsEnabled = true;
if (process.env.VITE_ENV === "development" && isLogsEnabled) {
  ll.setLevel(log.levels.DEBUG);
} else {
  ll.setLevel(log.levels.WARN);
}
export default function ExcelProcessor(context, workbook) {
  this.context = context;
  this.workbook = workbook;
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
  const evalCode = (code) => {
    ll.debug("evaluating code", {
      code,
      workbook: this.workbook,
    });
  };
  const processWorkbook = async (onProgress) => {
    ll.debug("processing workbook...", {
      workbook: this.workbook,
    });
    let workPromises = [];
    return new Promise((allResolve) => {
      for (const sheetName of Object.keys(this.workbook.Sheets)) {
        let sheet = this.workbook.Sheets[sheetName];
        let sheetCellCounter = 0;
        for (const cellName of Object.keys(sheet).filter(
          (cellName) => !cellName.startsWith("!")
        )) {
          workPromises.push(
            new Promise((resWorkPromise) => {
              sheetCellCounter++;
              let cell = splitCell(cellName);
              let totalRows = getRange(sheet).e.r + 1;
              let totalColumns = getRange(sheet).e.c + 1;
              let totalCells = totalRows * totalColumns;
              let currentRow = cell.row;
              let progress = (sheetCellCounter / totalCells) * 100;
              ll.debug(
                `processing cell ${cellName} rows: ${currentRow}/${totalRows}, cell: ${sheetCellCounter}/${totalCells}`,
                {
                  totalRows,
                  currentRow,
                  workbook: this.workbook,
                  cellName,
                  cell,
                }
              );
              setTimeout(() => {
                let result = {
                  progress,
                  cellName,
                };
                onProgress(result);
                resWorkPromise(result);
              }, 500);
            })
          );
        }
      }

      let promiseExecution = async () => {
        for (let promise of workPromises) {
          try {
            const res = await promise;
          } catch (error) {
            console.error(error.message);
          }
        }
      };
      return promiseExecution().then(() => {
        ll.debug("finished processing workbook.", {
          workbook: this.workbook,
        });
        allResolve(this.workbook);
      });
    }, []);
  };
  return {
    evalCode,
    processWorkbook,
  };
}
