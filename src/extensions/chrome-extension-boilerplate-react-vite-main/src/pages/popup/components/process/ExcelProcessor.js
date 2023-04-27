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
    return new Promise((res, rej) => {
      Object.keys(this.workbook.Sheets).forEach((sheetName) => {
        let sheet = this.workbook.Sheets[sheetName];
        let cellCounter = 0;
        Object.keys(sheet)
          .filter((cellName) => !cellName.startsWith("!"))
          .forEach((cellName) => {
            (async () => {
              cellCounter++;
              let cell = splitCell(cellName);
              let totalRows = getRange(sheet).e.r + 1;
              let totalColumns = getRange(sheet).e.c + 1;
              let totalCells = totalRows * totalColumns;
              let currentRow = cell.row;
              let progress = (cellCounter / totalCells) * 100;
              ll.debug(
                `processing cell ${cellName} rows: ${currentRow}/${totalRows}, cell: ${cellCounter}/${totalCells}`,
                {
                  totalRows,
                  currentRow,
                  workbook: this.workbook,
                  cellName,
                  cell,
                }
              );
              await new Promise((res) => setTimeout(res, 100));
              onProgress({
                progress,
                cellName,
              });
            })();
          });
      });
      ll.debug("finished processing workbook.", {
        workbook: this.workbook,
      });
      res(this.workbook);
    }, []);
  };
  return {
    evalCode,
    processWorkbook,
  };
}
