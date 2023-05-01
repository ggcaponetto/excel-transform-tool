### ETT Functions Quickstart

ETT Functions allow you to define a JavaScript function that runs on every cell of the spreadsheet.

These functions will run in a special context where you will have access to the following variables:

**Please note that all functions need to be async arrow-functions.**

````javascript
const runOnCell = async () => {
    const workbook = this.wb; // https://docs.sheetjs.com/docs/csf/book
    const cell = this.cell; // e.g. { row: 15, column: "A" }
    const cellName = this.cellName; // e.g. "A15"
    const sheetName = this.sheetName; // "MySheet"
    const cellValue = this.cellValue; // "Hello World"
    const range = this.range; // row count --> range.e.r, column count --> range.e.c
    console.log("Available in your function: ", {
        workbook,
        cell,
        cellName,
        sheetName,
        cellValue,
        range
    });
    return "some value"; // Whatever is returned inside this function, will be written to the current cell.
}
runOnCell().then(result => result); 
````